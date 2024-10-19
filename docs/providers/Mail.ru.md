---
id: mailru
---

# 🌐 Mail.ru

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/mailru#documentation "Direct link to heading")

[https://o2.mail.ru/docs](https://o2.mail.ru/docs)

## Configuration[](https://next-auth.js.org/providers/mailru#configuration "Direct link to heading")

[https://o2.mail.ru/app/](https://o2.mail.ru/app/)

## Options[](https://next-auth.js.org/providers/mailru#options "Direct link to heading")

The **Mail.ru Provider** comes with a set of default options:

-   [Mail.ru Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/mailru.js)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/mailru#example "Direct link to heading")

```js
import MailRuProvider from "next-auth/providers/mailru";
...
providers: [
  MailRuProvider({
    clientId: process.env.MAILRU_CLIENT_ID,
    clientSecret: process.env.MAILRU_CLIENT_SECRET
  })
]
...
```