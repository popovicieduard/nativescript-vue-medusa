import registerComponents from '@/util/component-loader'
import { builder } from '@/util/container'
import { APP } from '.'

export default builder(({ configure }) => {
  configure(async (get) => {
    const app = await get(APP)

    registerComponents(
      app,
      import.meta.webpackContext('..', {
        recursive: true,
        regExp: /\.global\.vue$/,
        mode: 'sync',
      }),
      'core-',
    )
  })
})
