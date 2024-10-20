---
id: boxyhq-saml
---

# 🌐 BoxyHQ SAML

:::info[정보]
이 문서는 아직 번역이 되어있지않습니다! 조금만 기다려주세요!
:::

## Documentation

BoxyHQ SAML is an open source service that handles the SAML login flow as an OAuth 2.0 flow, abstracting away all the complexities of the SAML protocol.


## Configuration

SAML login requires a configuration for every tenant of yours. One common method is to use the domain for an email address to figure out which tenant they belong to. You can also use a unique tenant ID (string) from your backend for this, typically some kind of account or organization ID.

Check out the [documentation](https://boxyhq.com/docs/jackson/saml-flow#2-saml-config-api) for more details.


## Options

The **BoxyHQ SAML Provider** comes with a set of default options:

- [BoxyHQ Provider options](https://github.com/nextauthjs/next-auth/tree/v4/packages/next-auth/src/providers/boxyhq-saml.ts)
  
You can override any of the options to suit your own use case.

## Example 
```js
import BoxyHQSAMLProvider from "next-auth/providers/boxyhq-saml"
...
providers: [
  BoxyHQSAMLProvider({
    issuer: "http://localhost:5225",
    clientId: "dummy", // The dummy here is necessary since we'll pass tenant and product custom attributes in the client code
    clientSecret: "dummy", // The dummy here is necessary since we'll pass tenant and product custom attributes in the client code
  })
}
...
```

On the client side you'll need to pass additional parameters `tenant` and `product` to the `signIn` function. This will allow BoxyHQL SAML to figure out the right SAML configuration and take your user to the right SAML Identity Provider to sign them in.
```jsx
import { signIn } from "next-auth/react";
...

  // Map your users's email to a tenant and product
  const tenant = email.split("@")[1];
  const product = 'my_awesome_product';
...
  <Button
    onClick={async (event) => {
      event.preventDefault();

      signIn("boxyhq-saml", {}, { tenant, product });
    }}>
...
```