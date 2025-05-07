import { name, optionName } from '@/util/container'
import Medusa from '@medusajs/js-sdk'
import { App, NSVElement, VNode } from 'nativescript-vue'
import { RouterService } from 'router-vue-native/dist/router-service'
import { type AppT } from '../model'
import { Route } from '../router/model'
import { RootStore } from '../store'

export const CONTAINER = 'CONTAINER'

export const ROUTES = optionName<Route[]>('ROUTES')
export const APPS = optionName<AppT>('APPS')

export const APP = name<App<NSVElement>>('APP')
export const ROOT_COMPONENT = name<VNode>('ROOT_COMPONENT')
export const ROUTER = name<RouterService>('ROUTER')
export const STORE = name<RootStore>('STORE')
export const APP_MAP = name<Record<string, AppT>>('APP_MAP')

export const MEDUSA_CLIENT = name<Medusa>('MEDUSA_CLIENT')
