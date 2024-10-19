---
id: zoom
---

# 🌐 Zoom

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/zoom#documentation "Direct link to heading")

[https://marketplace.zoom.us/docs/guides/auth/oauth](https://marketplace.zoom.us/docs/guides/auth/oauth)

## Configuration[](https://next-auth.js.org/providers/zoom#configuration "Direct link to heading")

[https://marketplace.zoom.us](https://marketplace.zoom.us/)

## Options[](https://next-auth.js.org/providers/zoom#options "Direct link to heading")

The **Zoom Provider** comes with a set of default options:

-   [Zoom Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/zoom.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/zoom#example "Direct link to heading")

```js
import ZoomProvider from "next-auth/providers/zoom"
...
providers: [
    ZoomProvider({
        clientId: process.env.ZOOM_CLIENT_ID,
        clientSecret: process.env.ZOOM_CLIENT_SECRET
    })
    }
...
```
