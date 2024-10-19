---
id: wordpress
---

# 🌐 WordPress.com

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/wordpress#documentation "Direct link to heading")

[https://developer.wordpress.com/docs/oauth2/](https://developer.wordpress.com/docs/oauth2/)

## Configuration[](https://next-auth.js.org/providers/wordpress#configuration "Direct link to heading")

[https://developer.wordpress.com/apps/](https://developer.wordpress.com/apps/)

## Options[](https://next-auth.js.org/providers/wordpress#options "Direct link to heading")

The **Wordpress Provider** comes with a set of default options:

-   [Wordpress Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/wordpress.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/wordpress#example "Direct link to heading")

```js
import WordpressProvider from "next-auth/providers/wordpress";
...
providers: [
  WordpressProvider({
    clientId: process.env.WORDPRESS_CLIENT_ID,
    clientSecret: process.env.WORDPRESS_CLIENT_SECRET
  })
}
...
```

:::tip
Register your application to obtain Client ID and Client Secret at [https://developer.wordpress.com/apps/](https://developer.wordpress.com/apps/) Select Type as Web and set Redirect URL to `http://example.com/api/auth/callback/wordpress` where example.com is your site domain.
:::