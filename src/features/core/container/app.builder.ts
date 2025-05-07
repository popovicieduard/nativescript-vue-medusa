import { builder } from '@/util/container'
import { createApp } from 'nativescript-vue'
import { APP, ROOT_COMPONENT, ROUTER } from '.'

export default builder(({ provide }) => {
  provide(APP, async (get) => {
    const root = await get(ROOT_COMPONENT)

    return createApp({
      name: 'App',
      render() {
        return root
      },
    })
  })
})
