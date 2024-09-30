import { contentApiHandlers } from "./handlers/contentHandlers";
import { crowdinTranslationsGetHandler } from "./handlers/crowdinTranslationsHandler";
import { eventsApiHandlers } from "./handlers/eventsHandlers";
import { lapiApiHandlers } from "./handlers/lapiHandlers";

export const handlers = [
  ...lapiApiHandlers,
  ...eventsApiHandlers,
  ...contentApiHandlers,
  ...crowdinTranslationsGetHandler,
];
