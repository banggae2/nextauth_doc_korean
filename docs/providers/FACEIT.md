---
id: faceit
---

# 🌐 FACEIT

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::
## Documentation[](https://next-auth.js.org/providers/faceit#documentation "Direct link to heading")

[https://cdn.faceit.com/third\_party/docs/FACEIT\_Connect\_3.0.pdf](https://cdn.faceit.com/third_party/docs/FACEIT_Connect_3.0.pdf)

## Configuration[](https://next-auth.js.org/providers/faceit#configuration "Direct link to heading")

[https://developers.faceit.com/apps](https://developers.faceit.com/apps)

Grant type: `Authorization Code`

Scopes to have basic infos (email, nickname, guid and avatar) : `openid`, `email`, `profile`

## Options[](https://next-auth.js.org/providers/faceit#options "Direct link to heading")

The **FACEIT Provider** comes with a set of default options:

-   [FACEIT Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/faceit.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/faceit#example "Direct link to heading")

```js
import FaceItProvider from "next-auth/providers/faceit";
...
providers: [
    FaceItProvider({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET
    })
]
...
```
