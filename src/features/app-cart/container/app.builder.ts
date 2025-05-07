import { APPS } from '@/features/core/container'
import { type AppName } from '@/features/core/model'
import { option } from '@/util/container'

export const APP_CART: AppName = 'APP_CART'

export default option(APPS, () => {
  return {
    name: APP_CART,
    label: 'Cart',
    link: {
      to: { name: 'AppCart' },
    },
    order: 0,
  }
})
