---
id: overview
---

# 🌐 Overview

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

---

문서 이름 앞에 `🌐`가 있다면 아직 번역이 되지않았다는것을 의미합니다.

문서를 읽으실 때 참고해주세요!

---
Authentication Providers in **NextAuth.js** are services that can be used to sign in a user.

There are four ways a user can be signed in:

-   [Using a built-in OAuth Provider](https://next-auth.js.org/configuration/providers/oauth) (e.g Github, Twitter, Google, etc...)
-   [Using a custom OAuth Provider](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider)
-   [Using Email](https://next-auth.js.org/configuration/providers/email)
-   [Using Credentials](https://next-auth.js.org/configuration/providers/credentials)

:::note
NextAuth.js is designed to work with any OAuth service, it supports **OAuth 1.0**, **1.0A**, **2.0** and **OpenID Connect (OIDC)** and has built-in support for most popular sign-in services.
:::