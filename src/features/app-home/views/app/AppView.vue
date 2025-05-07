<template>
  <page>
    <ui-layout use="core-default-layout" #default>
      <scroll-view>
        <flexbox-layout flexDirection="row" flexWrap="wrap" class="w-full">
          <template v-for="product in products" :key="product.id">
            <app-home-product :product="product"/>
          </template>
        </flexbox-layout>
      </scroll-view>
    </ui-layout>
  </page>
</template>

<script lang="ts">
import { StoreProduct } from '@medusajs/types/dist/http'
import { Component } from 'vue-facing-decorator'
import MedusaMixin from '~/features/core/components/mixins/medusa.mixin'
import RouterMixin from '~/features/core/components/mixins/router.mixin'
import { AsyncData } from '~/util/async-data.decorator'
import { Mixin } from '~/util/mixin'

@Component
export default class AppView extends Mixin(RouterMixin, MedusaMixin) {
  public products: StoreProduct[] = []

  @AsyncData()
  private async asyncData(): Promise<AsyncData<AppView>> {
    const { products } = await this.medusa.store.product.list({ fields: '*variants.calculated_price' })
    return { products }
  }
}
</script>
