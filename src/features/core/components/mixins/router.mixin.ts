import { NavigateToOptions } from 'nativescript-vue/dist/plugins/navigation'
import { RouterService } from 'router-vue-native/dist/router-service'
import { Component } from 'vue-facing-decorator'
import { ROUTER } from '../../container'
import { Route } from '../../router/model'
import ContainerMixin from './container.mixin'

type GoToArgs = {
  name?: string
  path?: string
}

@Component
export default class RouterMixin extends ContainerMixin {
  protected get router(): RouterService {
    return this.container(ROUTER)
  }

  private get routes(): Route[] {
    return this.router.routes
  }

  private get routeNameMap(): Map<string, Route> {
    return new Map(this.routes.map((route) => [route.name?.toString() ?? route?.component?.name ?? route.path, route]))
  }

  private get routePathMap(): Map<string, Route> {
    return new Map(this.routes.map((route) => [route.path, route]))
  }

  public async routeTo<T = unknown>(args: GoToArgs, options?: NavigateToOptions<T>): Promise<void> {
    if (args.name !== undefined) {
      const component = this.routeNameMap.get(args.name)?.component
      if (!component) {
        console.error(`component undefined for route name ${args.name}`)
        return
      }
      void this.$navigateTo(component, options)
    }

    if (args.path !== undefined) {
      const component = this.routePathMap.get(args.path)?.component
      if (!component) {
        console.error(`component undefined for route path ${args.path}`)
        return
      }
      void this.$navigateTo(component, options)
    }
  }
}
