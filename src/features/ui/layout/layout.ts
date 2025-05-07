import { RequiredProp } from '@/util/prop-decorators'
import { h, Slot, VNode } from 'nativescript-vue'
import { Component, Inject, Vue } from 'vue-facing-decorator'
import { LayoutEngineRoot } from './layout-engine'
import { type ComponentReference, REGISTER_LAYOUT, UNREGISTER_LAYOUT } from './model'

@Component({ inheritAttrs: false })
export class Layout extends Vue {
  @RequiredProp()
  public use!: ComponentReference

  @Inject({ from: REGISTER_LAYOUT })
  public readonly registerLayout?: LayoutEngineRoot['registerLayout']

  @Inject({ from: UNREGISTER_LAYOUT })
  public readonly unregisterLayout?: LayoutEngineRoot['unregisterLayout']

  private readonly _uid!: number

  public render(): VNode {
    const defaultSlot = this.$slots.default?.()
    const entries = Object.entries(this.$slots).map(([key, slot]) => [key, this.wrapSlot(slot, key)] as const)

    this.registerLayout?.(this, {
      _isVue: true,
      use: this.use,
      attrs: this.$attrs,
      slots: Object.fromEntries(entries),
    })

    return h('root-layout', {}, [defaultSlot])
  }

  public beforeDestroy(): void {
    this.unregisterLayout?.(this)
  }

  private wrapSlot(slot: Slot | undefined, key: string): Slot | undefined {
    if (!slot) {
      return undefined
    }

    return (props) => {
      const children = slot(props)
      if (!children || children.length === 0) {
        return children
      }

      return [h('root-layout', { key: `${this._uid}-${key}` }, children)]
    }
  }
}
