# Building an OTP Verification System with React, and Autogon phone call API


>This app is showcasing the Autogon AI power and this can be integrated into any application that needs to integrate a OTP verification system. 

This app was built using react [vite](https://vitejs.dev/guide/), [JSON-server](https://www.npmjs.com/package/json-server), and [Autogon Phone call API](https://autogon.ai/playground/phone-call).


To run this app locally, you need to have an [Autogon](https://autogon.ai/) account, so as to be able to get your API key. If you don't have an existing account, [signup](https://console.autogon.ai/), and log in to your dashboard, click your profile image, then click on settings, you'd find the tab for API, generate your API key and come back to your code for usage.

At the root level of your app (that is, the same location where your `vite.config.js` is located), create a `.env` file and put your API key there for safety.

>the `sample.env` file is there to guide you on what is needed
>base url is `https://api.autogon.ai/api/v1`

### Endpoints

*Phone Call API (base url)*
```plaintext
https://api.autogon.ai/customer-service
```
*Complete API*
```plaintext
https://api.autogon.ai/customer-service/api/v1/phone/make-call
```
---

Once you clone this repo, change your directory into the folder, open your terminal, either through your coding environment or your default system based (cmd, terminal). Run `npm install`, and `npm run dev` in the terminal respectively and your app should be running.

:bulb: Build yours and show me what you came up with.