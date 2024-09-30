// Generated file. Do not edit manually.
// Run yarn workspace @rayo/localisation generate to update this file.
export type ClientCommonDictionary = {
  hello: null;
  "hello-username": { username: string };
  "nav-to-home": null;
  "premium-button-label": null;
  "nav-search": null;
  "nav-my-library": null;
  "nav-login": null;
  "nav-open-menu": null;
  "nav-close-menu": null;
  "nav-login-user": { name: string };
  "nav-account-settings": null;
  "nav-sign-out": null;
  "nav-profile-menu-sr": { name: string };
  "what-s-your-postcode": null;
  "postcode-placeholder": null;
  "postcode-not-recognised-double-check-and-try-again": null;
  "icon-go-back": null;
  "icon-close": null;
  Continue: null;
  "shows-on-air": null;
  "scroller-slide-left": null;
  "scroller-slide-right": null;
  "play-button": null;
  "for-you-episode-card-on-air": null;
  "station-disc-carousel-edit": null;
};
export type ServerCommonDictionary = {
  server: null;
  "onboarding-stations-near-you": null;
  "onboarding-share-your-postcode": null;
  "onboarding-enter-postcode": null;
  "would-you-like-to-share-your-location": null;
  "find-your-local-stations": null;
  "find-all-your-favourite-local-stations-and-content-based-on-your-postcode": null;
  "relevant-content": null;
  "listen-to-news-weather-traffic-updates-and-more-based-on-your-postcode": null;
  "update-postcode": null;
  "you-can-change-this-anytime-in-settings": null;
  continue: null;
  skip: null;
  "postcode-not-recognised-double-check-and-try-again": null;
  "what-s-your-postcode": null;
  "postcode-placeholder": null;
  "onboarding-choose-your-genres": null;
  "onboarding-pick-at-least-3": null;
  "icon-go-back": null;
  "icon-close": null;
  "onboarding-choose-your-stations": null;
  "onboarding-pick-as-many-stations-as-you-want": null;
  "onboarding-popular-stations": null;
  "station-disc-carousel-edit": null;
  "featured-stations-all-stations": null;
  "featured-stations-heading": null;
  "footer-terms-and-conditions": null;
  "footer-privacy-policy": null;
  "footer-competition-terms-and-conditions": null;
  "footer-cookie-policy": null;
  "footer-advertise-with-us": null;
};
export type _testDictionary = {
  greeting: null;
  welcome: null;
  helloUser: { username: string };
};
export type PageId = "client-common" | "server-common" | "_test";
export type Dictionary =
  | ClientCommonDictionary
  | ServerCommonDictionary
  | _testDictionary;
export type DicMap = {
  "client-common": ClientCommonDictionary;
  "server-common": ServerCommonDictionary;
  _test: _testDictionary;
};
