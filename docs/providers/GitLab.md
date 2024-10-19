---
id: gitlab
---

# 🌐 GitLab

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

:::note
GitLab returns a field on `Account` called `created_at` which is a number. See their [docs](https://docs.gitlab.com/ee/api/oauth2.html). Remember to add this field as optional to your database schema, in case if you are using an [Adapter](https://next-auth.js.org/adapters).
:::

## Documentation[](https://next-auth.js.org/providers/gitlab#documentation "Direct link to heading")

[https://docs.gitlab.com/ee/api/oauth2.html](https://docs.gitlab.com/ee/api/oauth2.html)

## Configuration[](https://next-auth.js.org/providers/gitlab#configuration "Direct link to heading")

[https://gitlab.com/-/profile/applications](https://gitlab.com/-/profile/applications)

## Options[](https://next-auth.js.org/providers/gitlab#options "Direct link to heading")

The **Gitlab Provider** comes with a set of default options:

-   [Gitlab Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/gitlab.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/gitlab#example "Direct link to heading")

```js
import GitlabProvider from "next-auth/providers/gitlab";
...
providers: [
  GitlabProvider({
    clientId: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET
  })
]
...
```

:::tip
Enable the _"read\_user"_ option in scope if you want to save the users email address on sign up.
:::