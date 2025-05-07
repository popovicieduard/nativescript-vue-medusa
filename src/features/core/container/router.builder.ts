import { builder } from '@/util/container'
import { flatten } from 'lodash'
import { APP, ROUTER, ROUTES } from '.'
import { createRouter } from '../router'

export default builder(({ configure, provide }) => {
  provide(ROUTER, async (get) => createRouter(flatten(await get(ROUTES))))

  configure(async (get) => {
    const router = await get(ROUTER)
    const app = await get(APP)

    app.use(router)
  })
})
