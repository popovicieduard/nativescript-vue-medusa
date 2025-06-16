# Medusa NativeScript Vue App

This is a mobile application built using **NativeScript + Vue 3** that integrates with **Medusa v2** via the `@medusajs/js-sdk`.

## 🎞️ Tech Stack

* [NativeScript](https://nativescript.org/)
* [Vue 3](https://v3.vuejs.org/) (class components)
* [Medusa v2](https://docs.medusajs.com/)
* TypeScript
* TailwindCSS
* Vue Router & Vuex (via decorators)

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (recommended: LTS version)
* NativeScript CLI:
```bash
npm install -g @nativescript/cli
```

### Install Dependencies

```bash
npm install
```

### Set variables

> The `MEDUSA_API_URL` and `MEDUSA_PUBLISHABLE_KEY` defined in `env.ts` **must** be set.

### Run the App (Preview Mode)

```bash
npm run dev
```

This uses NativeScript Preview to run the app on a device (iOS or Android).

> **Note for iOS users:**
> The `MEDUSA_API_URL` defined in `env.ts` **must** be set to an `https://` endpoint and must be externally accessible (i.e., no `localhost`).
> This is due to iOS restrictions with local networking and insecure requests during preview mode.

## 🔧 Configuration

Environment variables such as the Medusa API URL are configured in `src/env.ts`:

```ts
// Example:
export const MEDUSA_API_URL = "https://your-medusa-api.com";
```

## 🧹 Key Dependencies

* `@medusajs/js-sdk` - Medusa client SDK for frontend integration
* `nativescript-vue` - Vue.js integration for NativeScript
* `vue-facing-decorator` / `vuex-facing-decorator` - Type-safe Vue and Vuex decorators
* `@nativescript/tailwind` - TailwindCSS integration
* `@nativescript-community/ui-image` - Advanced image handling
* `router-vue-native` - NativeScript-compatible Vue Router

## 📁 Project Structure

```
src/
├── assets/    		# App assets folder
├── features/    	# App code split into domains called features
├── util/    		# App util folder
├── app.css         # App css entry point
├── app.ts          # App entry point
├── bootstrap.ts    # App container entry point
├── env.ts          # Environment settings
└── polyfills.ts    # App polyfills for `console`
```

## 👨‍💼 Development Notes

* Code is written in TypeScript.
* TailwindCSS is integrated for styling via NativeScript plugin.
* Uses Webpack for module bundling and polyfills (via `node-polyfill-webpack-plugin`).

## 🛠️ Linting

To lint your code, run:

```bash
npm run lint
```

(Lint command can be configured in `package.json` if needed.)

## 📜 License

MIT License
