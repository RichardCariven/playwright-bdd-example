## Packages / Crowdin

Every page fetches translations from Crowdin, available at https://crowdin.com/project/rayo-podcast-studio. The returned
translations include both the specific translations for the requested page and the common translations found in
common.json.

:warning: Translations are considered a non-critical resource. If something goes wrong with the fetching process, or if
the data structure from Crowdin is not as expected, the translation key will be displayed to the end user.

### Different ways to access translations in the application

#### Hook - `useCrowdin`

The preferred method for obtaining translations is by using the useCrowdin hook. This hook returns a function,
which in turn returns a string and falls back to the key if needed.

### Crowdin and different environments

The same Crowdin translations are used across all application environments. :warning: Caution: When making larger
changes, keep
in mind that updates to Crowdin will impact both the live version and all ongoing development versions of the
application. Creating a new Crowdin distribution may be advisable.

### Crowdin and testing

Crowdin data is mocked in tests[^1] to get consistency. Update mocked data with:

```shell
yarn workspace @rayo/localisation produce
```
