---
id: spotify
---

# 🌐 Spotify

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/spotify#documentation "Direct link to heading")

[https://developer.spotify.com/documentation/general/guides/authorization-guide](https://developer.spotify.com/documentation/general/guides/authorization-guide)

## Configuration[](https://next-auth.js.org/providers/spotify#configuration "Direct link to heading")

[https://developer.spotify.com/dashboard/applications](https://developer.spotify.com/dashboard/applications)

## Options[](https://next-auth.js.org/providers/spotify#options "Direct link to heading")

The **Spotify Provider** comes with a set of default options:

-   [Spotify Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/spotify.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/spotify#example "Direct link to heading")

```js
import SpotifyProvider from "next-auth/providers/spotify";
...
providers: [
  SpotifyProvider({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })
]
...
```
