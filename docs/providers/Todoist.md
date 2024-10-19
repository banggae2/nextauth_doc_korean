---
id: todoist
---

# 🌐 Todoist

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation[](https://next-auth.js.org/providers/todoist#documentation "Direct link to heading")

[https://developer.todoist.com/guides/#oauth](https://developer.todoist.com/guides/#oauth)

## Configuration[](https://next-auth.js.org/providers/todoist#configuration "Direct link to heading")

[https://developer.todoist.com/appconsole.html](https://developer.todoist.com/appconsole.html)

## Options[](https://next-auth.js.org/providers/todoist#options "Direct link to heading")

The **Todoist Provider** comes with a set of default options:

-   [Todoist Provider options](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/todoist.ts)

You can override any of the options to suit your own use case.

## Example[](https://next-auth.js.org/providers/todoist#example "Direct link to heading")

```js
import TodoistProvider from "next-auth/providers/todoist";

...
providers: [
  TodoistProvider({
    clientId: process.env.TODOIST_ID,
    clientSecret: process.env.TODOIST_SECRET
  })
]
...
```
