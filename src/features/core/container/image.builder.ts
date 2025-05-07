import { APP } from '@/features/core/container'
import { configure } from '@/util/container'
import ImageModule from '@nativescript-community/ui-image/vue'

export default configure(async (get) => {
  const app = await get(APP)

  app.use(ImageModule)
})
