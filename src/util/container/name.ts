export interface Name<T = unknown> extends String {}
export type ResolveType<N> = N extends Name<infer T> ? T : never

export function name<T>(desc?: string | number): Name<T> {
  return String(desc)
}
