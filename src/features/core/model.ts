import { Route } from './router/model'

export class LoginRequired extends Error {}

export type AppName = `APP_${string}`

export interface AppT {
  name: AppName
  label: string
  link?: {
    to: Partial<Route>
    icon?: string
    [key: string]: unknown
  }
  order?: number
}

export function appOrderCompare(a: AppT, b: AppT): number {
  return (a.order || 0) - (b.order || 0) || (a.label || a.name).localeCompare(b.label || b.name)
}
