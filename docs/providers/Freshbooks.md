---
id: freshbooks
---

# 🌐 Freshbooks

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/freshbooks#documentation "Direct link to heading")

[https://www.freshbooks.com/api/authenticating-with-oauth-2-0-on-the-new-freshbooks-api](https://www.freshbooks.com/api/authenticating-with-oauth-2-0-on-the-new-freshbooks-api)

## Configuration[](https://next-auth.js.org/providers/freshbooks#configuration "Direct link to heading")

[https://my.freshbooks.com/#/developer](https://my.freshbooks.com/#/developer)

## Options[](https://next-auth.js.org/providers/freshbooks#options "Direct link to heading")

The Freshbooks Provider comes with a set of default options:

[https://www.freshbooks.com/api/start](https://www.freshbooks.com/api/start)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/freshbooks#example "Direct link to heading")

```js
import FreshbooksProvider from "next-auth/providers/freshbooks";
...
providers: [
  FreshbooksProvider({
    clientId: process.env.FRESHBOOKS_CLIENT_ID,
    clientSecret: process.env.FRESHBOOKS_CLIENT_SECRET,
  })
]
...
```
