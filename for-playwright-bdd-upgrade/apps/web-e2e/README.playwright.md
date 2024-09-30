# Rayo web e2e

The Rayo web e2e framework is based on Playwright using the Playwright-BDD library in order to be able to create
Cucumber steps to run the tests.

The Playwright Runner is used to trigger the tests.

https://github.com/vitalets/playwright-bdd

https://playwright.dev/docs/intro

## Contents

- [Setup](#setup)
- [Running the Tests](#running-the-tests)
- [Overview of the framework ](#overview-of-the-framework)
- [Defining should and should not](#defining-the-negative)
- [Locators](#locators)

## Setup

The provided commands assume that the Rayo web Readme (README.md) has been followed and all necessary packages to build the Rayo web
application have been installed.

The provided commands install the packages required for running the tests locally and then install the playwright
browsers

### Setup

```sh
cd apps/web-e2e/
yarn install
npx playwright install
```

## Running the Tests

### Running the tests locally

build the Rayo app locally

```sh
cd apps/web/
yarn build
yarn dev
```

Once the application is running to run all tests

```sh
cd apps/web-e2e/
yarn e2e:overnight
```

Ths will run all tests in the features directory

```sh
yarn e2e
```

this will run all tests exceot those tagged @overnight

```sh
yarn e2e:dev
```

this will run only tests tagged with @dev, note @dev tag should not be committed and should ponly be used when
writing/debugging a test

### Running the tests in github actions

when there is a push the e2e tests will be run automatically. Note if no changes have been made in /web
and changes are only in the web-e2e folder Vercel will not trigger a new web build and so the tests will fail. You will
need to manually go into Github, select the vercel build that has been cancelled and manually redeploy, then trigger
the playwright action again once Vercel has deployed.

## Overview of the framework

Tests are written as features in the Feature File using the cucumber syntax

Given, When, Then

Each feature file must have the Feature name defined, and each test must be defined by a scenario, or scenario outline

Steps are written using the Playwright-BDD syntax

# Overview of a step

```sh
When I click the "Continue" button
```

```sh
When(
"I click the {string} button/link/dropdown",
async ({ page, globalConfig }, elementKey: ElementKey) => {
const { elementIdentifier } = getElementLocator(
page,
elementKey,
globalConfig,
);
await expect(elementIdentifier).toBeVisible();
await elementIdentifier.click();
},
);
```

in the example above "continue" could be any string that related back to a locator as defined in the mappings file (see below)

note - where words are seperated by / within the step code the regex will match against any one of the options
so

```sh
When I click the "Continue" link
When I click the "Continue" button
When I click the "Continue" dropdown
```

will all link to the same step

# Defining the negative

It is possible to define the negative for instance should or should not in the same step.

```sh
And the "Skip" link should be displayed
And the "Skip" link should not be displayed
```

```sh
Then(
"the {string} button/field/link/dropdown/menu should( not) be displayed",
async ({ page, $step, globalConfig }, elementKey: ElementKey) => {
const negate = /should not/.test($step.title);
const { elementIdentifier } = getElementLocator(
page,
elementKey,
globalConfig,
);

    if (negate) {
      await expect(elementIdentifier).not.toBeVisible();
    } else {
      await expect(elementIdentifier).toBeVisible();
    }
},
);
```

in the above $step is a playwright-BDD function that allows the step name to be passed, in this case it is used as a
boolean to define if `should not` is present in the step, if it is then the element should not be visible.

# Locators

The framework makes use of the playwright getBy locator strategy, getByRole, getBytestId etc.

Locators are used by passing a mapping name from the step into `getElementLocator` in the
`apps/web-e2e/tests/support/web-element-helper.ts`, this then looks up the current page and checks both that page and
the common locatorsFixture in the baseFixture `/step-definitions/setup/locatorsFixture.ts` (note in future this file may be split
into a number of fixture files). This mapping allows for generic steps that are not page dependant.

The playwright Identifiers in use are listed in `apps/web-e2e/tests/env/global.ts` if additional locatorsFixture are required
they need to be added to Common Element here and then the appropriate `else if` added to the getElementLocator function
