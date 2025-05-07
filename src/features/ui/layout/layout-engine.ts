import { OptionalProp } from '@/util/prop-decorators'
import { ComponentPublicInstance, h, resolveComponent, VNode } from 'nativescript-vue'
import { Component, Provide, Vue } from 'vue-facing-decorator'
import { Layout } from './layout'
import { type ComponentReference, EMPTY_CONFIG, REGISTER_LAYOUT, UNREGISTER_LAYOUT } from './model'

interface LayoutConfig {
  _isVue: true
  use?: ComponentReference
  slots?: ComponentPublicInstance['$slots']
  attrs?: ComponentPublicInstance['$attrs']
}

export type LayoutEngineRoot = LayoutEngine

@Component
export default class LayoutEngine extends Vue {
  @OptionalProp()
  private defaultLayout?: ComponentReference

  private config: LayoutConfig = EMPTY_CONFIG
  private owner?: Layout

  @Provide(REGISTER_LAYOUT)
  public registerLayout(owner: Layout, config: LayoutConfig): void {
    this.owner = owner
    this.config = config
  }

  @Provide(UNREGISTER_LAYOUT)
  public unregisterLayout(owner: Layout): void {
    if (owner !== this.owner) {
      return
    }

    this.owner = undefined
    this.config = EMPTY_CONFIG
  }

  public render(): VNode {
    const defaultSlot = this.$slots.default?.()

    return h('page', {}, [defaultSlot, this.createLayoutVNode()])
  }

  private createLayoutVNode(): VNode | undefined {
    if (this.config === EMPTY_CONFIG) {
      return undefined
    }

    const component = this.config.use || this.defaultLayout || 'root-layout'

    return h(
      typeof component === 'string' ? resolveComponent(component, true) : component,
      {
        ...this.config.attrs,
        key: 'layout',
      },
      this.config.slots ?? this.$slots,
    )
  }
}
