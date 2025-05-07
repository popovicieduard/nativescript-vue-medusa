import { createRouter as createRouterFn } from 'router-vue-native'
import { RouterService } from 'router-vue-native/dist/router-service'
import NotFoundView from '../views/NotFoundView.vue'
import { Route } from './model'

export function createRouter(routes: Route[]): RouterService {
  return createRouterFn({
    routes: [
      ...routes,
      {
        path: '*',
        component: NotFoundView,
        name: 'NotFound',
        meta: { guest: true },
      },
    ],
  })
}
