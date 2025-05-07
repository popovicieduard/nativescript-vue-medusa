import { ROUTES } from '@/features/core/container'
import { option } from '@/util/container'
import AppView from '../views/app/AppView.vue'
import { APP_CART } from './app.builder'

export default option(ROUTES, () => [
  {
    name: 'AppCart',
    path: '/cart',
    component: AppView,
    meta: { app: APP_CART, key: () => 'AppCart' },
  }
])
