const { CacheHandler } = require("@neshca/cache-handler");
const { isImplicitTag } = require("@neshca/cache-handler/helpers");
const createLruCache = require("@neshca/cache-handler/local-lru").default;
const { commandOptions, createClient } = require("redis");

const logDebug = process.env.CACHE_HANDLER_LOG_LEVEL === "debug";
const logInfo =
  process.env.CACHE_HANDLER_LOG_LEVEL === "debug" ||
  process.env.CACHE_HANDLER_LOG_LEVEL === "info";
const logError =
  process.env.CACHE_HANDLER_LOG_LEVEL === "debug" ||
  process.env.CACHE_HANDLER_LOG_LEVEL === "info" ||
  process.env.CACHE_HANDLER_LOG_LEVEL === "error";

CacheHandler.onCreation(async () => {
  const localCache = createLruCache({
    maxItemsNumber: 10000,
    maxItemSizeBytes: 1024 * 1024 * 250, // Limit to 250 MB
  });

  let customRedisHandler;
  if (!process.env.REDIS_CACHE_HOST) {
    // eslint-disable-next-line no-console
    console.warn("REDIS_CACHE_HOST env is not set, using local cache only.");
  } else {
    try {
      // eslint-disable-next-line no-console
      if (logInfo) console.info("Creating Redis client...");

      // Always create a Redis client inside the `onCreation` callback.
      const client = createClient({
        url: process.env.REDIS_CACHE_HOST,
        socket: {
          tls: true,
        },
      });

      // Ignore Redis errors: https://github.com/redis/node-redis?tab=readme-ov-file#events.
      client.on("error", (err) => {
        if (logError) console.error("Redis client error:", err);
      });

      await client.connect();
      // eslint-disable-next-line no-console
      if (logInfo) console.info("Redis client connected.");

      // Define a timeout for Redis operations.
      const timeoutMs = 10000;

      // Define a key prefix for the cache.
      // It is useful to avoid key collisions with other data in Redis,
      // or to delete all cache keys at once by using a pattern.
      const keyPrefix = "nextjs-app-cache:";

      // Define a key for shared tags.
      // You'll see how to use it later in the `revalidateTag` method
      const sharedTagsKey = "_sharedTags_";

      // Create an assert function to ensure that the client is ready before using it.
      // When you throw an error in any Handler method,
      // the CacheHandler will use the next available Handler listed in the `handlers` array.
      // eslint-disable-next-line no-inner-declarations
      function assertClientIsReady() {
        if (!client.isReady) {
          throw new Error(
            "Redis client is not ready yet or connection is lost.",
          );
        }
      }

      const revalidatedTagsKey = `${keyPrefix}__revalidated_tags__`;

      // Create a custom Redis Handler
      customRedisHandler = {
        // Give the handler a name.
        // It is useful for logging in debug mode.
        name: "redis-strings-custom",
        // We do not use try/catch blocks in the Handler methods.
        // CacheHandler will handle errors and use the next available Handler.
        async get(key, implicitTags) {
          // eslint-disable-next-line no-console
          if (logInfo) console.info(`Attempting to get cache for key: ${key}`);

          // Ensure that the client is ready before using it.
          // If the client is not ready, the CacheHandler will use the next available Handler.
          assertClientIsReady();

          // Create a new AbortSignal with a timeout for the Redis operation.
          // By default, redis client operations will wait indefinitely.
          const options = commandOptions({
            signal: AbortSignal.timeout(timeoutMs),
          });

          // Get the value from Redis.
          // We use the key prefix to avoid key collisions with other data in Redis.
          const result = await client.get(options, keyPrefix + key);

          // If the key does not exist, return null.
          if (!result) {
            // eslint-disable-next-line no-console
            if (logInfo) console.info(`Cache miss for key: ${key}`);
            return null;
          }

          // Redis stores strings, so we need to parse the JSON.
          const cacheValue = JSON.parse(result);

          // If the cache value has no tags, return it early.
          if (!cacheValue) {
            if (logInfo || process.env.CACHE_GET_LOG)
              // eslint-disable-next-line no-console
              console.info(`Cache value for key ${key} is invalid.`);
            return null;
          }

          // Get the set of explicit and implicit tags.
          // implicitTags are available only on the `get` method.
          // eslint-disable-next-line no-undef
          const combinedTags = new Set([
            ...cacheValue.tags,
            ...implicitTags.implicitTags,
          ]);

          // If there are no tags, return the cache value early.
          if (combinedTags.size === 0) {
            if (logDebug || process.env.CACHE_GET_LOG) {
              // eslint-disable-next-line no-console
              console.log(`Cache hit for key: ${key}`);
            }
            return cacheValue;
          }

          // Get the revalidation times for the tags.
          const revalidationTimes = await client.hmGet(
            commandOptions({ signal: AbortSignal.timeout(timeoutMs) }),
            revalidatedTagsKey,
            Array.from(combinedTags),
          );

          // Iterate over all revalidation times.
          for (const timeString of revalidationTimes) {
            // If the revalidation time is greater than the last modified time of the cache value,
            if (
              timeString &&
              Number.parseInt(timeString, 10) > cacheValue.lastModified
            ) {
              // Delete the key from Redis.
              await client.unlink(
                commandOptions({ signal: AbortSignal.timeout(timeoutMs) }),
                keyPrefix + key,
              );

              // Return null to indicate cache miss.
              return null;
            }
          }

          if (logDebug || process.env.CACHE_GET_LOG) {
            // eslint-disable-next-line no-console
            console.log(`Cache hit for key: ${key}`);
          }

          // Return the cache value.
          return cacheValue;
        },
        async set(key, cacheHandlerValue) {
          // eslint-disable-next-line no-console
          if (logInfo) console.info(`Setting cache for key: ${key}`);

          // Ensure that the client is ready before using it.
          assertClientIsReady();

          // Create a new AbortSignal with a timeout for the Redis operation.
          const options = commandOptions({
            signal: AbortSignal.timeout(timeoutMs),
          });

          // Redis stores strings, so we need to stringify the JSON.
          const setOperation = client.set(
            options,
            keyPrefix + key,
            JSON.stringify(cacheHandlerValue),
          );

          // If the cacheHandlerValue has a lifespan, set the automatic expiration.
          // cacheHandlerValue.lifespan can be null if the value is the page from the Pages Router without getStaticPaths or with `fallback: false`
          // so, we need to check if it exists before using it
          const expireOperation = cacheHandlerValue.lifespan
            ? client.expireAt(
                options,
                keyPrefix + key,
                cacheHandlerValue.lifespan.expireAt,
              )
            : undefined;

          // If the cache handler value has tags, set the tags.
          // We store them separately to save time to retrieve them in the `revalidateTag` method.
          const setTagsOperation = cacheHandlerValue.tags.length
            ? client.hSet(
                options,
                keyPrefix + sharedTagsKey,
                key,
                JSON.stringify(cacheHandlerValue.tags),
              )
            : undefined;

          // Wait for all operations to complete.
          // eslint-disable-next-line no-undef
          await Promise.all([setOperation, expireOperation, setTagsOperation]);
          // eslint-disable-next-line no-console
          if (logInfo) console.info(`Cache set for key: ${key}`);
        },
        async revalidateTag(tag) {
          // eslint-disable-next-line no-console
          if (logInfo) console.info(`Revalidating tag: ${tag}`);

          // Ensure that the client is ready before using it.
          assertClientIsReady();

          // Check if the tag is implicit.
          // Implicit tags are not stored in the cached values.
          if (isImplicitTag(tag)) {
            // Mark the tag as revalidated at the current time.
            await client.hSet(
              commandOptions({ signal: AbortSignal.timeout(timeoutMs) }),
              revalidatedTagsKey,
              tag,
              Date.now(),
            );

            // eslint-disable-next-line no-console
            if (logInfo) console.info(`Implicit tag ${tag} revalidated.`);
          }

          // Create a map to store the tags for each key.
          // eslint-disable-next-line no-undef
          const tagsMap = new Map();

          // Cursor for the hScan operation.
          let cursor = 0;

          // Query size for the hScan operation.
          const querySize = 25;

          // Iterate over all keys in the shared tags.
          // eslint-disable-next-line no-constant-condition
          while (true) {
            // Get a portion of the keys.
            const remoteTagsPortion = await client.hScan(
              keyPrefix + sharedTagsKey,
              cursor,
              { COUNT: querySize },
            );

            // Iterate over all keys in the portion.
            for (const { field, value } of remoteTagsPortion.tuples) {
              // Parse the tags from the value.
              tagsMap.set(field, JSON.parse(value));
            }

            // If the cursor is 0, we have reached the end.
            if (remoteTagsPortion.cursor === 0) {
              break;
            }

            // Update the cursor for the next iteration.
            cursor = remoteTagsPortion.cursor;
          }

          // Create an array of keys to delete.
          const keysToDelete = [];

          // Create an array of tags to delete form the hash map.
          const tagsToDelete = [];

          // Iterate over all keys and tags.
          for (const [key, tags] of tagsMap) {
            // If the tags include the specified tag, add the key to the delete list.
            if (tags.includes(tag)) {
              // Key must be prefixed because we use the key prefix in the set method.
              keysToDelete.push(keyPrefix + key);
              // Set an empty string as the value for the revalidated tag.
              tagsToDelete.push(key);
            }
          }

          // If there are no keys to delete, return early.
          if (keysToDelete.length === 0) {
            // eslint-disable-next-line no-console
            if (logInfo) console.info(`No keys to delete for tag: ${tag}`);
            return;
          }

          if (logInfo) {
            // eslint-disable-next-line no-console
            console.info(
              `Deleting keys for revalidated tag: ${tag}`,
              keysToDelete,
            );
          }

          // Create a new AbortSignal with a timeout for the Redis operation.
          const options = commandOptions({
            signal: AbortSignal.timeout(timeoutMs),
          });

          // Delete the keys from Redis.
          const deleteKeysOperation = client.unlink(options, keysToDelete);

          // Update the tags in Redis by deleting the revalidated tags.
          const updateTagsOperation = client.hDel(
            options,
            keyPrefix + sharedTagsKey,
            tagsToDelete,
          );

          // Wait for all operations to complete.
          // eslint-disable-next-line no-undef
          await Promise.all([deleteKeysOperation, updateTagsOperation]);

          // eslint-disable-next-line no-console
          if (logInfo) console.info(`Revalidated tag ${tag} processed.`);
        },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        "Failed to initialize Redis cache, using local cache only.",
        error,
      );
    }
  }
  return {
    // The order of the handlers is important.
    // The CacheHandler will run get methods in the order of the handlers array.
    // Other methods will be run in parallel.
    handlers: [customRedisHandler, localCache],
  };
});

module.exports = CacheHandler;
