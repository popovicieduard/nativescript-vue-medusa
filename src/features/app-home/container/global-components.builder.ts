import { APP } from '@/features/core/container'
import registerComponents from '@/util/component-loader'
import { configure } from '@/util/container'

export default configure(async (get) => {
  const app = await get(APP)

  registerComponents(
    app,
    import.meta.webpackContext('..', {
      recursive: true,
      regExp: /\.global\.vue$/,
      mode: 'sync',
    }),
    'app-home-',
  )
})
