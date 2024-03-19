# TypeScript

## Define type for `user`

Mặc định object `user` được định nghĩa interface như sau:

```ts
interface User {
  [key: string]: any;
}
```

Nghĩa là `user` object có thể chứa bất kỳ property nào, điều này đồng nghĩa với việc trong quá trình sử dụng bạn sẽ không nhận được những lợi ích từ TypeScript.

Để fully type cho `user` object, bạn có thể sử định nghĩa lại type cho `user` object như sau:

```ts
// ts-shim.d.ts
export type MyUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  // ...
};

declare module 'nuxt-3-auth/types' {
  interface User extends MyUser {}
}

export {};
```
