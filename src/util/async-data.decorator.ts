import { isFunction } from '@/util/lang'
import { isObject } from 'lodash'

export function AsyncData(): MethodDecorator {
  return (_target, _propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const method: unknown = descriptor.value

    if (!isFunction(method)) {
      return
    }

    descriptor.value = async function (...args: unknown[]) {
      const result = await method.apply(this, args)

      if (isObject(result)) {
        for (const [key, value] of Object.entries(result)) {
          //@ts-expect-error
          this.$data[key] ??= undefined
          //@ts-expect-error
          this.$data[key] = value
        }
      }

      return result
    }
  }
}
