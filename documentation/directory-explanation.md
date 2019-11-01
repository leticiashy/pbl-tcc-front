# Directory Explanation

From the root level top-down

```bash
./build
./config
./test
./src
```

## Build

This is where our webpack configuration is placed at, if some new module needs to be adde, it must be added here, by **default**, our configs are divided by dev and production.

## Config

This is where our environment configs are placed at, it should be placed here API url, or other env variables that must be accessed from the front.

## Test

This is where our tests code are placed at, for more info about how to write codes, check the jest documentation.

## Src

This is where our code are placed at, it is divided by responsibility.

```bash
./src/assets       # This is where the assets should be placed at
./src/components   # This is where the ui components / pages components / master pages should be placed at
./src/helpers      # This is where the helpers for services or components should be placed at
./src/interceptors # This is where the interceptors for HTTP request should be placed at
./src/languages    # This is where the translations for i18n should be placed at
./src/middlewares  # This is where the Vue's middlewares should be placed at
./src/mixins       # This is where the global/local mixins should be placed at
./src/models       # This is where the models for use in services or data should be placed at
./src/services     # This is where the services for components should be placed at
./src/store        # This is where the modules for store should be placed at
```
