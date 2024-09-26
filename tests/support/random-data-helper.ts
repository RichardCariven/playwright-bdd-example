import { faker } from "@faker-js/faker/locale/en_GB";

export const randomInputTypes = [
  "Email",
  "Password",
  "First-name",
  "Surname",
  "Address-line-1",
  "Address-line-2",
  "City",
  "Postcode",
  "Age",
  "Gender",
] as const;
export type RandomInputType = (typeof randomInputTypes)[number];

export const randomEmail = (): string => {
  return faker.internet.exampleEmail();
};

export const randomPassword = (): string => {
  return faker.internet.password();
};

export const randomFirstName = (): string => {
  return faker.person.firstName();
};

export const randomSurname = (): string => {
  return faker.person.lastName();
};

export const randomAddressLine1 = (): string => {
  return faker.location.streetAddress();
};

export const randomAddressLine2 = (): string => {
  return faker.location.secondaryAddress();
};

export const randomCity = (): string => {
  return faker.location.city();
};

export const randomPostcode = (): string => {
  return faker.location.zipCode();
};

export const randomAge = (): string => {
  const min = 16;
  const max = 80;

  const age = Math.floor(Math.random() * (max - min + 1)) + min;
  return age.toString();
};

export const randomGender = (): string => {
  const arr: string[] = [
    "Man",
    "Woman",
    "Non-Binary",
    "Custom",
    "Rather not say",
  ];
  if (arr.length === 0) {
    throw Error("🧨 gender undefined 🧨");
  } else {
    const ind: number = Math.floor(Math.random() * arr.length);
    const gender: string = arr[ind];
    return gender;
  }
};

export const getRandomData = (randomInputType: RandomInputType): string => {
  switch (randomInputType) {
    case "Email":
      return randomEmail();
    case "Password":
      return randomPassword();
    case "First-name":
      return randomFirstName();
    case "Surname":
      return randomSurname();
    case "Address-line-1":
      return randomAddressLine1();
    case "Address-line-2":
      return randomAddressLine2();
    case "City":
      return randomCity();
    case "Postcode":
      return randomPostcode();
    case "Age":
      return randomAge();
    case "Gender":
      return randomGender();
    default:
      return "";
  }
};
