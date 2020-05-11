# BeewebUi

This Angular project provides the Bee Web front-end.

## To Test build locally
* run `ng build --prod` to create a local build.
* modify `dist/beeweb-ui/assets/env.js` to use your backend api.
* run `[lite-server](https://www.npmjs.com/package/lite-server) --baseDir="dist/beeweb-ui"` or equivalent.

## Container Usage

The container accepts three, environment variables:

**REQUIRED**
* `API_URL` points to Backend URL or service.

**OPTIONAL**
* `DEBUG` indicates the Angular Debug flag. DEFAULT: false

