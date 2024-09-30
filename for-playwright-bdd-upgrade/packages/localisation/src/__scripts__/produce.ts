import { fetchCrowdinManifest } from "../helpers/fetchCrowdinManifest/fetchCrowdinManifest";
import { createMocks } from "./createMocks/createMocks";
import { createTypedMocks } from "./createTypedMocks/createTypedMocks";
import { createTypes } from "./createTypes/createTypes";
import { fetchCrowdinContents } from "./fetchCrowdinContents/fetchCrowdinContents";

const main = async () => {
  const { pageIds, timestamp } = await fetchCrowdinManifest();
  const dictionaries = await fetchCrowdinContents("en", pageIds, timestamp);
  await createMocks(__dirname + "/../__mocks__", dictionaries);
  await createTypes(__dirname + "/../", dictionaries);
  await createTypedMocks(`${__dirname}/../__mocks__`, dictionaries);
};

void main();
