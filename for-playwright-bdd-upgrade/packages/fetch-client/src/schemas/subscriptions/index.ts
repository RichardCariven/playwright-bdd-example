/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/healthcheck": {
    get: operations["HealthCheckController_check"];
  };
  "/v1/subscriptions": {
    /** Get subscriptions owned by user */
    get: operations["SubscriptionsController_getSubscriptionsForUser"];
    /** Create a subscription */
    post: operations["SubscriptionsController_createUserSubscription"];
    /** Delete subscriptions owned by user */
    delete: operations["SubscriptionsController_deleteUserSubscription"];
  };
  "/v1/export": {
    /** Get subscription stream for the last 24 hours */
    get: operations["ExportController_getExportForPast24Hours"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    EntityMetadataInDto: {
      /** @description The id of entity, i.e station id, track id */
      entity_id: number;
      /**
       * @description The type of entity
       * @enum {string}
       */
      entity_type:
        | "station"
        | "podcast_episode"
        | "podcast"
        | "boxset"
        | "boxset_episode"
        | "listenagain_show"
        | "listenagain"
        | "track"
        | "content-tag";
    };
    SubscriptionInDto: {
      /**
       * @description Where the subscription is from. This can be anything
       * @example kerrang-app
       */
      source?: string;
      /**
       * @description Contextual value of the subscription
       * @example listened_until 60s
       */
      value?: string;
      /**
       * @description Subscription type, ["subscribe", "bookmark", etc]
       * @enum {string}
       */
      type:
        | "subscribe"
        | "bookmark"
        | "reaction"
        | "listened_until"
        | "favourite"
        | "prefers";
      entity_metadata: components["schemas"]["EntityMetadataInDto"][];
    };
    EntityMetadataOutDto: {
      /** @description The id of entity, i.e station id, track id */
      entity_id: number;
      /**
       * @description The type of entity
       * @enum {string}
       */
      entity_type:
        | "station"
        | "podcast_episode"
        | "podcast"
        | "boxset"
        | "boxset_episode"
        | "listenagain_show"
        | "listenagain"
        | "track"
        | "content-tag";
      /** @description raw data about this EntityMetadata pulled from external locations, mainly LAPI */
      data?: Record<string, never>;
      id: Record<string, never>;
      /** @enum {string} */
      entity_region_code:
        | "GB"
        | "NO"
        | "DK"
        | "FI"
        | "SE"
        | "DE"
        | "GR"
        | "CY"
        | "RO"
        | "MD";
    };
    SubscriptionOutDto: {
      /** @enum {string} */
      type:
        | "subscribe"
        | "bookmark"
        | "reaction"
        | "listened_until"
        | "favourite"
        | "prefers";
      id: number;
      account_id: string;
      region_code: string;
      source: string | null;
      value: string;
      entity_metadata: components["schemas"]["EntityMetadataOutDto"][];
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    DataResponseLinks: {
      self?: string;
      prev?: string;
      next?: string;
    };
    DataResponsePagination: {
      /**
       * @description Total number of items
       * @default 0
       */
      total: number;
      /**
       * @description Number of items in current request
       * @default 0
       */
      count: number;
      /**
       * @description Number of items per page
       * @default 50
       */
      per_page: number;
      /**
       * @description The current page
       * @default 1
       */
      current_page: number;
      /**
       * @description Total number of pages
       * @default 1
       */
      total_pages: number;
      /** @description Not guaranteed. Can eventually contain the "prev" and "next" endpoint to request more data */
      links?: components["schemas"]["DataResponseLinks"];
    };
    DataResponseMeta: {
      pagination: components["schemas"]["DataResponsePagination"];
    };
    DataResponse: {
      data: readonly components["schemas"]["SubscriptionOutDto"][];
      meta: components["schemas"]["DataResponseMeta"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  HealthCheckController_check: {
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  /** Get subscriptions owned by user */
  SubscriptionsController_getSubscriptionsForUser: {
    parameters: {
      query: {
        /**
         * @description Where the subscription is from. This can be anything
         * @example kerrang-app
         */
        source?: string;
        /**
         * @description Contextual value of the subscription
         * @example listened_until 60s
         */
        value?: string;
        /** @description Subscription id */
        id?: number;
        entity_metadata?: Record<string, never>[][];
        /** @description Orders data by provided parameter */
        _o?:
          | "recency"
          | "-recency"
          | "az"
          | "-az"
          | "expiry"
          | "-expiry"
          | "reaction"
          | "-reaction";
        /** @description Filter by entity title */
        title?: string;
        /** @description Pagination: Page number */
        _p: number;
        /** @description Pagination: Items per page */
        _pp: number;
        inflate: boolean;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["DataResponse"];
        };
      };
    };
  };
  /** Create a subscription */
  SubscriptionsController_createUserSubscription: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SubscriptionInDto"];
      };
    };
    responses: {
      /** @description The subscription has been successfully created. */
      201: {
        content: never;
      };
      /** @description Forbidden. */
      403: {
        content: never;
      };
    };
  };
  /** Delete subscriptions owned by user */
  SubscriptionsController_deleteUserSubscription: {
    parameters: {
      query?: {
        /**
         * @description Where the subscription is from. This can be anything
         * @example kerrang-app
         */
        source?: string;
        /**
         * @description Contextual value of the subscription
         * @example listened_until 60s
         */
        value?: string;
        /** @description Subscription id */
        id?: number;
        entity_metadata?: Record<string, never>[][];
      };
    };
    responses: {
      204: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  /** Get subscription stream for the last 24 hours */
  ExportController_getExportForPast24Hours: {
    responses: {
      200: {
        content: never;
      };
    };
  };
}
