import { ROUTES } from '@/features/core/container'
import { option } from '@/util/container'
import AppView from '../views/app/AppView.vue'
import ProductView from '../views/app/ProductView.vue'
import { APP_HOME } from './app.builder'

export default option(ROUTES, () => [
  {
    name: 'AppHome',
    path: '/',
    component: AppView,
    meta: { app: APP_HOME, key: () => 'AppHome' },
  },
  {
    name: 'AppHome/Product',
    path: '/product/:id',
    component: ProductView,
    meta: { app: APP_HOME, key: () => 'AppHome/Product' },
  },
])
