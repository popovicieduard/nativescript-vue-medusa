import Medusa from '@medusajs/js-sdk'
import { Component } from 'vue-facing-decorator'
import { Mixin } from '~/util/mixin'
import { MEDUSA_CLIENT } from '../../container'
import ContainerMixin from './container.mixin'

@Component
export default class MedusaMixin extends Mixin(ContainerMixin) {
  protected get medusa(): Medusa {
    return this.container(MEDUSA_CLIENT)
  }
}
