---
id: netlify
---

# 🌐 Netlify

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/netlify#documentation "Direct link to heading")

[https://www.netlify.com/blog/2016/10/10/integrating-with-netlify-oauth2/](https://www.netlify.com/blog/2016/10/10/integrating-with-netlify-oauth2/)

## Configuration[](https://next-auth.js.org/providers/netlify#configuration "Direct link to heading")

[https://github.com/netlify/netlify-oauth-example](https://github.com/netlify/netlify-oauth-example)

## Options[](https://next-auth.js.org/providers/netlify#options "Direct link to heading")

The **Netlify Provider** comes with a set of default options:

-   [Netlify Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/netlify.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/netlify#example "Direct link to heading")

```js
import NetlifyProvider from "next-auth/providers/netlify";
...
providers: [
  NetlifyProvider({
    clientId: process.env.NETLIFY_CLIENT_ID,
    clientSecret: process.env.NETLIFY_CLIENT_SECRET
  })
]
...
```
