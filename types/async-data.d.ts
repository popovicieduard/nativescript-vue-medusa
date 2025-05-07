/* eslint-disable @typescript-eslint/ban-types */

type AsyncData<T = unknown> = {
  [K in keyof T as T[K] extends Function ? never : K extends `$${string}` ? never : K]?: T[K]
}
