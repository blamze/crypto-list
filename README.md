# crypto-list
## Project Setup
1. Add `COINMARKET_API_KEY` to .env file from https://pro.coinmarketcap.com/account
2. Run `yarn` to install dependencies
3. Run `yarn run:server` in one terminal to start the server
4. Run `yarn dev` in another terminal to start the client

## Notes
### Why server is needed?
CoinMarketCap - Making HTTP requests on the client side with Javascript is currently prohibited through CORS configuration. This is to protect your API Key which should not be visible to users of your application so your API Key is not stolen. Secure your API Key by routing calls through your own backend service.
1. Security for API Key
2. Bypass CORS

### How server works ?
Server proxy request to `TARGET_URL` from env variable and add `X-CMC_PRO_API_KEY` header with `COINMARKET_API_KEY` from env variable.
It also changes the response header to allow CORS.

For production CORS in server/index.js `allowedOrigins` should be set to the domain of the client for security reasons.

## Files
`src/assets/main.css` - contains Reset CSS   
`src/components/icons` - contains SVG icons with dynamic color via CSS color property   
`src/configs/url.ts` - contains API URL, base URL is set in .env `VITE_APP_ENDPOINT`   

## Notes
1. Used starter for project `vue vite`. Project has typescript, eslint, prettier.
2. Project is using Bootstrap v5. There are 2 libraries specialized for vue3+bootstrap, but one is quite old and another is in Alpha stage.
3. Crypto list has loading and error states.
4. There is container around the list to make it responsive and prevent to be too wide.
5. By default, infinity loader fetches next page when 300 px are left from the bottom of the page. It can be changed in useInitInfiniteScroll hook.


-----
This template should help get you started developing with Vue 3 in Vite.
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
