import { provide } from '@/util/container'
import Medusa from '@medusajs/js-sdk'
import { MEDUSA_API_URL, MEDUSA_PUBLISHABLE_KEY } from '~/env'
import { MEDUSA_CLIENT } from '.'

export default provide(MEDUSA_CLIENT, async () => {
  const medusaClient = new Medusa({
    baseUrl: MEDUSA_API_URL,
    publishableKey: MEDUSA_PUBLISHABLE_KEY,
    debug: true,
  })

  return medusaClient
})
