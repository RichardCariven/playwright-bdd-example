# Rayo web

TODO: Write short description about rayo web. Urls etc.

## Contents

- [Setup](#setup)
- [Storybook](#storybook)
- [Playwright](#playwright)
- [Web](#web)
  - [Environment variables](#environment-variables)
  - [Google Analytics](#google-analytics)

## Setup

> :stop_sign: This section has be superseded by the [Docker](README.Docker.md) instructions.

The provided commands install Node.js, Yarn, and set up a local development environment for the "rayo-web" project. It
starts by installing Node Version Manager (NVM) and Node.js version 18.16.0. Then it installs Yarn globally and clones
the "rayo-web" repository. After navigating to the "rayo-web" directory, it installs project dependencies using Yarn.
Finally, it starts a development server and opens the project in a web browser at http://localhost:3000.

### Setup - Quick

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18.17.0
npm install --global yarn
git clone git@github.com:BauerXcel/rayo-web.git
cd rayo-web
yarn
yarn dev
open http://localhost:3000
```

### Setup - Detailed

#### Install NVM and Node 18.16.0 LTS

Node Version Manager (NVM) provides a convenient way to switch between different versions of Node.js, enabling
developers to work with specific versions of Node.js for different projects or to test compatibility with different
versions. It allows you to install, uninstall, and switch between Node.js versions with ease.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18.17.0
```

#### Install Yarn

Yarn is a package manager for JavaScript. It was developed by Facebook as an alternative to the npm (Node Package
Manager) that comes bundled with Node.js. Yarn was created to address some of the limitations and performance issues
experienced with npm.

```sh
npm install --global yarn
```

#### Clone the repo

```sh
git clone git@github.com:BauerXcel/rayo-web.git
```

#### Install project dependencies

```sh
yarn
```

#### Run the project

```sh
yarn dev
open http://localhost:3000
```

## Storybook

We have single Storybook for whole repo under apps. Storybook read stories from whole repo.

### Storybook on Chromatic

Chromatic Storybook can be accessed by using following url pattern
`https://<branch-name>--66d9be8864940bf7cf74fef2.chromatic.com/`

By default Chromatic makes captures in mobile1 (the smallest viewport), xl light and xl dark (desktop) viewports.
It is possible to add more viewports at story level, or disable the default ones by disabling a higher-level mode.
More information here https://www.chromatic.com/docs/modes/#disable-a-higher-level-mode

### Storybook decorators

Storybook offers two build-in decorators for web app components and pages. They are `web-app-page` and `web-app-component`.

### Running Storybook

Run this on root level

```sh
yarn storybook
```

### Building Storybook

Run this on root level

```sh
yarn workspace storybook run storybook:build
```

This creates `storybook-static` dir in storybook app. You can run local http server on the
export `npx http-server apps/storybook/storybook-static`.

## Playwright

see apps/web-e2e/README.md

## Prettier Formatting

Prettier is set to run on .ts .tsx and .md files only when running scripts.
Prettier will run on before a commit on the staged files via lint-staged.
Prettier will also run in CI via github actions on all .ts .tsx and .md files, on pull request.
A `.prettierignore` file is located at root which should mirror the `.gitignore` file.

You can manually run prettier with the following scripts.

### Check files that require formatting

```sh
yarn format
```

This script check files and find ones that need formatting, but wont make any changes to those files.
This command returns an error if any files are found that need formatting.

### Format files and save changes

```sh
yarn format:fix
```

This script will find, format, and save the changes to any files that need formatting.

## Web

Located in `./apps/web`.

### Environment variables

The main idea is to have environment variables checked in as code. By doing this there is no need to update environment
variables on Vercel before deploying. This also makes it easier to roll back a deployment in case of an error.

:warning: There are some exceptions though; If the environment variable _contains secrets_ it should not be added to
dotenv files and checked in. It should instead be handled via the Vercel page and added to `.env.local` if needed.

There are different `dotenv` files that are applied depending on where the application is built.

#### Dotenv files

| File                   | Description                                                                                                     |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------- |
| .env.development       | Applied automatically by Next.js when `next dev` runs.                                                          |
| .env.vercel.preview    | Applied when `next build` runs on feature branches ([see file](./apps/web/nextPlugins/withEnv.js)).             |
| .env.vercel.production | Applied when `next build` runs on certain branches like `main` ([see file](./apps/web/nextPlugins/withEnv.js)). |

#### Local env file

Create `.env.local` to take precedence over variables specified in dotenv files above. It should also contain _secret_
variables if needed locally. This file should not be checked in.

#### Environment variables on Vercel

Environment variables can also be defined on the Vercel website. Use it for:

- Variables that contains a secret.
- Installing Vercel integration.
- Setting up an environment where you need to override the default configuration (environment variables on Vercel takes
  precedence over variables specified in dotenv files above).

#### Test environments

| Environments    | Description                                                                            |
| :-------------- | :------------------------------------------------------------------------------------- |
| Storybook dev   | Will automatically apply `.env.development` when running `storybook dev`.              |
| Storybook build | Will apply `.env.vercel.preview` via `.storybook/main` when running `storybook build`. |
| Jest            | Will apply `.env.vercel.preview` via `jest.env.js`.                                    |

### Google Analytics

Using the official nextjs library to integrate Google Analytics. [nextjs third parties](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
This gives a no config page view event, and a function to send custom events.
There is regional config for each region to enable/disable GA4 and set the tracking id.
