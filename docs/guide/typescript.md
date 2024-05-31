# TypeScript

## Define type for `user`

By default, the `user` object is defined as the following interface:

```ts
interface User {
  [key: string]: any;
}
```

The `user` object can contain any property, which means you won't get the benefits of TypeScript when using it.

To fully type the `user` object, you can redefine the type for the `user` object as follows:

```ts
// ts-shim.d.ts
import type { User } from '@trandaison/nuxt-3-auth';

export type CustomUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  // ...
};

declare module '@trandaison/nuxt-3-auth' {
  interface User extends CustomUser {}
}

export {};
```
