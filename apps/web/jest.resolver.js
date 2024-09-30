// Based on https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
module.exports = (path, options) => {
  // Jest + jsdom acts like a browser (i.e., it looks for "browser" imports
  // under pkg.exports), but msw knows that you're operating in a Node
  // environment:
  //
  // https://github.com/mswjs/msw/issues/1786#issuecomment-1782559851
  //
  // The MSW project's recommended workaround is to disable Jest's
  // customExportConditions completely, so no packages use their browser's
  // versions.  We'll instead clear export conditions only for MSW.
  if (/^(msw|@mswjs\/interceptors)(\/|$)/.test(path)) {
    return options.defaultResolver(path, {
      ...options,
      conditions: options.conditions.filter(
        (condition) => condition !== "browser",
      ),
    });
  }

  return options.defaultResolver(path, options);
};
