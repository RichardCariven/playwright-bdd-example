## Packages / fetch-client

Generating fetch-client by using [openapi-typescript](https://openapi-ts.pages.dev/introduction) and [openapi-fetch](https://openapi-ts.pages.dev/openapi-fetch/). openapi-typescript current version (6.x) supports OpenAPI 3.0 and 3.1.

This package currently generates clients for

- LAPI (Converted 2.0 to 3.0 using Swagger online tool)
- Events
- Shepherd
- Subscriptions
- Helix Content

### Adding more client

Update existing command array with new yarn command in `./src/produce.ts`.

```sh
yarn openapi-typescript {SPEC_URL} -o ./src/schemas/{ENTITY}/index.ts
```

### API Keys

Access keys are neeeded to request spec. Create `.env` inside `/fetch-client` which contains following keys.

- EVENTS_API_ACCESS_KEY={KEY}
- RAYO_CONTENT_ACCESS_KEY={KEY}
- SUBSCRIPTIONS_ACCESS_KEY={KEY}
- SHEPHERD_ACCESS_KEY={KEY}

### Generating client

```sh
yarn produce
```

### Converting openapi spec from v2 to v3

**openapi-typescript** requires openapi v3. Currently LAPI spec is v2, we converted to v3 using [Swagger editor](https://editor.swagger.io/). Clicking **Edit** button in Swagger editor should display **Convert to OpenAPI 3**.

### Issue after converting

After converting LAPI spec, schema references had to be manually updated due to semantic error.
Eg: `#/definitions/EmbeddedInitBrand` to `#/components/schemas/EmbeddedInitBrand`
