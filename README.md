# BeewebUi

This Angular project provides the Bee Web front-end.

![build](https://github.com/BeeRaspberry/beeweb-ui/workflows/build/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b3884cc782444a8daf8d99eef8bd27a4)](https://www.codacy.com/gh/BeeRaspberry/beeweb-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BeeRaspberry/beeweb-ui&amp;utm_campaign=Badge_Grade)

## To Test build locally
*   run `ng build --prod` to create a local build.
*   modify `dist/beeweb-ui/assets/env.js` to use your backend api.
*   run `[lite-server](https://www.npmjs.com/package/lite-server) --baseDir="dist/beeweb-ui"` or equivalent.

## Container Usage

The container accepts three, environment variables:

**REQUIRED**
*   `API_URL` points to Backend URL or service.

**OPTIONAL**
*   `DEBUG` indicates the Angular Debug flag. DEFAULT: false

