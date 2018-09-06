<a href="https://labs.moduscreate.com"><img src="https://res.cloudinary.com/modus-labs/image/upload/v1535020117/labs/logo-beep.svg" width="260" alt="Beep" /></a>

[![CircleCI](https://circleci.com/gh/ModusCreateOrg/beep.svg?style=shield)](https://circleci.com/gh/ModusCreateOrg/ionic-vue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)
[![Powered by Modus_Create](https://img.shields.io/badge/powered_by-Modus_Create-blue.svg?longCache=true&style=flat&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIwIDMwMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNOTguODI0IDE0OS40OThjMCAxMi41Ny0yLjM1NiAyNC41ODItNi42MzcgMzUuNjM3LTQ5LjEtMjQuODEtODIuNzc1LTc1LjY5Mi04Mi43NzUtMTM0LjQ2IDAtMTcuNzgyIDMuMDkxLTM0LjgzOCA4Ljc0OS01MC42NzVhMTQ5LjUzNSAxNDkuNTM1IDAgMCAxIDQxLjEyNCAxMS4wNDYgMTA3Ljg3NyAxMDcuODc3IDAgMCAwLTcuNTIgMzkuNjI4YzAgMzYuODQyIDE4LjQyMyA2OS4zNiA0Ni41NDQgODguOTAzLjMyNiAzLjI2NS41MTUgNi41Ny41MTUgOS45MjF6TTY3LjgyIDE1LjAxOGM0OS4xIDI0LjgxMSA4Mi43NjggNzUuNzExIDgyLjc2OCAxMzQuNDggMCA4My4xNjgtNjcuNDIgMTUwLjU4OC0xNTAuNTg4IDE1MC41ODh2LTQyLjM1M2M1OS43NzggMCAxMDguMjM1LTQ4LjQ1OSAxMDguMjM1LTEwOC4yMzUgMC0zNi44NS0xOC40My02OS4zOC00Ni41NjItODguOTI3YTk5Ljk0OSA5OS45NDkgMCAwIDEtLjQ5Ny05Ljg5NyA5OC41MTIgOTguNTEyIDAgMCAxIDYuNjQ0LTM1LjY1NnptMTU1LjI5MiAxODIuNzE4YzE3LjczNyAzNS41NTggNTQuNDUgNTkuOTk3IDk2Ljg4OCA1OS45OTd2NDIuMzUzYy02MS45NTUgMC0xMTUuMTYyLTM3LjQyLTEzOC4yOC05MC44ODZhMTU4LjgxMSAxNTguODExIDAgMCAwIDQxLjM5Mi0xMS40NjR6bS0xMC4yNi02My41ODlhOTguMjMyIDk4LjIzMiAwIDAgMS00My40MjggMTQuODg5QzE2OS42NTQgNzIuMjI0IDIyNy4zOSA4Ljk1IDMwMS44NDUuMDAzYzQuNzAxIDEzLjE1MiA3LjU5MyAyNy4xNiA4LjQ1IDQxLjcxNC01MC4xMzMgNC40Ni05MC40MzMgNDMuMDgtOTcuNDQzIDkyLjQzem01NC4yNzgtNjguMTA1YzEyLjc5NC04LjEyNyAyNy41NjctMTMuNDA3IDQzLjQ1Mi0xNC45MTEtLjI0NyA4Mi45NTctNjcuNTY3IDE1MC4xMzItMTUwLjU4MiAxNTAuMTMyLTIuODQ2IDAtNS42NzMtLjA4OC04LjQ4LS4yNDNhMTU5LjM3OCAxNTkuMzc4IDAgMCAwIDguMTk4LTQyLjExOGMuMDk0IDAgLjE4Ny4wMDguMjgyLjAwOCA1NC41NTcgMCA5OS42NjUtNDAuMzczIDEwNy4xMy05Mi44Njh6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+)](https://moduscreate.com)

<p>
<a href="https://beep.modus.app"><img src="./src/images/pwa-badge.svg" height="40" alt="Launch Progressive Web App" /></a>
<a href="#"><img src="./src/images/app-store-badge.svg" height="40" alt="Download Beep on the App Store"/></a>
<a href="#"><img src="./src/images/google-play-badge.png" height="40" alt="Get Beep on Google Play" /></a>
</p>

<hr />

## **Beep**: mobile account vulnerability scanner

Every day, over 4 million online data records are stolen or lost. Beep tells you if your online accounts have been stolen in any of these data breaches. Just enter your email address, username, or password, and we’ll tell you if it's been hacked.

## Pioneering Vue.js as a New Backend for Ionic

Beep is one of the first apps built on Vue.JS and Ionic Framework. With this combination, PHP developers no longer have to struggle with Angular to build cross platform Ionic apps. We even built our own router.

- [How it works](#how-it-works)
- [Installing](#installing)
- [Developing](#developing)
  - [Prerequisites](#prerequisites)
  - [iOS build](#ios-build)
  - [Android build](#android-build)
  - [Deploying](#deploying)
- [Ionic Vue](#ionic-vue)
- [Theming](#theming)
- [Modus Create](#modus-create)
- [License](#license)

# How it works

We've made sure that Beep won't end up yet another name on the list of data breaches. How? We hash all of your passwords and account information. In other words, we never store your passwords in plain text. Instead, we transform your password into a really, really long code and then, we send only the first five characters of that code to a server.

# Installing

Once you clone this repo go into the terminal and install dependencies.

```shell
npm install
```

Now you're ready to serve the development build.

```sh
npm run serve
```

# Developing

Beep is built with amazing libraries

- [Ionic](https://github.com/ionic-team/ionic)
- [Vue](https://github.com/vuejs/vue)
- [Ionic-Vue](https://github.com/ModusCreateOrg/ionic-vue)
- [Capacitor](https://github.com/ionic-team/capacitor)
- [Webpack](https://github.com/webpack/webpack)

## Prerequisites

Node 8.x+ is required for development.

## iOS build

Make sure you have `cocoapods` on your Mac OS. You can install `cocoapods` with `gem`

```sh
sudo gem install cocoapods
```

You can create an iOS-specific build by executing:

```sh
npm run build-ios
```

## Android build

You will need [Android SDK](https://developer.android.com/studio/).

The easiest way to set it up on a Mac is with `homebrew`.

```sh
brew install android-sdk
```

On Linux you can either use your distribution's package manager

```sh
sudo apt-get install android-sdk
```

Or install via
[Flatpak](https://flathub.org/apps/details/com.google.AndroidStudio) or
[Snap](https://uappexplorer.com/snap/ubuntu/android-studio)

After the SDK is setup you can create an Android-specific build by executing:

```sh
npm run build-android
```

## Deploying

To prepare your assets for a production deployment execute:

```sh
npm run build
```

This will create files and assets in the `dist/` directory

# Ionic Vue

<img src="https://res.cloudinary.com/modus-labs/image/upload/w_560/v1535019553/labs/logo-ionic-vue.svg"
width="260"
alt="@modus/ionic-vue">

[Ionic Vue](https://github.com/ModusCreateOrg/ionic-vue) enables Vue apps to use Ionic 4 with little to no configuration and no changes to familiar approaches. Originally a [Modus Labs](https://labs.moduscreate.com) project, Ionic Vue became part of the Ionic framework as the official support for Vue.

# Theming

For minor customizations you can edit the supplied `.env` file which allows you to edit the App name and status-bar colors for mobile/PWA builds.

Modifications of colors, fonts and other parts of UI are done in
`src/theme/common.css` and
`.vue` files in `src/components/` and `src/views/` which specify scoped styling rules.

For making modifications to native iOS and Android builds you will have to make changes within `android/` and `ios/` directories.

An in-depth description is provided by Capacitor's documentation

[Configuring iOS](https://capacitor.ionicframework.com/docs/ios/configuration)

[Configuring Android](https://capacitor.ionicframework.com/docs/android/configuration)

# Tests

To run the test suite execute:

```sh
npm test
```

This will confirm that any changes made to the original code did not break any existing functionality.

To extend the test suite create a new file in `tests/unit/` such as `new-feature.spec.js`

# Linting

Code linting is done with
[ESLint](https://github.com/eslint/eslint) and
[Prettier](https://github.com/prettier/prettier)

To run a check the project for any lint errors execute:

```sh
npm run lint
```

# Modus Create

[Modus Create](https://moduscreate.com) is a digital product consultancy. We use a distributed team of the best talent in the world to offer a full suite of digital product design-build services; ranging from consumer facing apps, to digital migration, to agile development training, and business transformation.

[![Modus Create](https://res.cloudinary.com/modus-labs/image/upload/h_80/v1533109874/modus/logo-long-black.png)](https://moduscreate.com)

This project is part of [Modus Labs](https://labs.moduscreate.com).

[![Modus Labs](https://res.cloudinary.com/modus-labs/image/upload/h_80/v1531492623/labs/logo-black.png)](https://labs.moduscreate.com)

# Licensing

This project is [MIT licensed](./LICENSE).
