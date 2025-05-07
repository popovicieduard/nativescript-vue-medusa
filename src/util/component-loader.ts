/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { kebabCase } from 'lodash'
import { App, Component, DefineComponent } from 'nativescript-vue'

const prefixRegEx = /^.*\//
const suffixRegEx = /\..*$/

export function extractComponent(component: DefineComponent): DefineComponent {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return 'default' in component ? component.default : component
}

export function toComponentName(path: string): string {
  return kebabCase(path.replace(prefixRegEx, '').replace(suffixRegEx, ''))
}

export interface ComponentLoaderResult {
  name: string
  component: DefineComponent
}

type Context = __WebpackModuleApi.RequireContext

// https://webpack.js.org/guides/dependency-management/#require-context
export function createLoader(context: Context, prefix = ''): () => Iterable<ComponentLoaderResult> {
  return function* () {
    for (const path of context.keys()) {
      const component = extractComponent(context(path))
      const name = prefix + toComponentName(path)
      yield { name, component }
    }
  }
}

export default function registerComponents(vue: App, context: Context, prefix = ''): void {
  for (const { name, component } of createLoader(context, prefix)()) {
    vue.component(name, component)
  }
}

export function registerAsyncComponents(
  vue: App,
  context: Context,
  factory: (path: string) => Component | DefineComponent | Lazy<Component | DefineComponent>,
  prefix = '',
): void {
  for (const path of context.keys()) {
    vue.component(prefix + toComponentName(path), factory(path.slice(2)))
  }
}
