import { get } from 'lodash'
import { Store } from 'vuex'
import { AppT } from '../model'
import { Route } from '../router/model'

export type RootStore = Store<State>
export const SET_CART_ID = 'SET_CART_ID'
export const SET_CART_ID_MUTATION = 'SET_CART_ID_MUTATION'

export class State {
  declare public route?: Route
  public cartId?: string
}

export async function createStore(apps: Record<string, AppT>): Promise<RootStore> {
  return new Store({
    state: () => new State(),
    getters: {
      appMap(): Record<string, AppT> {
        return apps
      },
      app(state): AppT | undefined {
        return apps[get(state, 'route.meta.app', '') as string]
      },
    },
    mutations: {
      [SET_CART_ID_MUTATION](state, cartId?: string) {
        state.cartId = cartId
      },
    },
    actions: {
      async [SET_CART_ID](context, cartId: string) {
        context.commit(SET_CART_ID_MUTATION, cartId)
      },
    },
  })
}
