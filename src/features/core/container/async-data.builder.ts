import { APP } from '@/features/core/container'
import { configure } from '@/util/container'
import { isFunction } from '@/util/lang'
import { isObject } from 'lodash'

export default configure(async (get) => {
  const app = await get(APP)

  app.use({
    install(Vue) {
      Vue.mixin({
        async created() {
          const asyncData = this['asyncData']
          if (isFunction(asyncData)) {
            try {
              const data = await asyncData()
              if (isObject(data)) {
                for (const [key, value] of Object.entries(data)) {
                  this.$data[key] = value
                }
              }
            } catch (error) {
              console.error(error)
            }
          }
        },
      })
    },
  })
})
