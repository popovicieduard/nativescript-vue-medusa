<template>
  <flexbox-layout width="50%" class="p-2" @tap="onProductTap">
    <stack-layout>
      <stack-layout
        class="aspect-[9/16] bg-gray-100 min-h-60 w-full rounded-md border border-gray-200"
        height="80%"
      >
        <NSImg
          :src="product.thumbnail"
          stretch="aspectFill"
          class="w-full h-full rounded-md border border-gray-200"
          :sharedTransitionTag="`product-image-${product.id}`"
        />
      </stack-layout>

      <flexbox-layout height="20%" flexDirection="row" justifyContent="space-between" class="py-4">
        <label :text="product.title" class="font-normal" />
        <label :text="productPrice(product)" class="font-normal" />
      </flexbox-layout>
    </stack-layout>
  </flexbox-layout>
</template>

<script lang="ts">
import type { StoreProduct, StoreProductVariant } from '@medusajs/types/dist/http'
import { PageTransition, SharedTransition } from '@nativescript/core'
import { Component } from 'vue-facing-decorator'
import RouterMixin from '~/features/core/components/mixins/router.mixin'
import { convertToLocale } from '~/util/money'
import { ObjectProp } from '~/util/prop-decorators'

@Component
export default class Product extends RouterMixin {
  @ObjectProp()
  public product!: StoreProduct

  public productPrice(product: StoreProduct): string {
    const cheapestVariant = product?.variants
      ?.filter((v: any) => !!v.calculated_price)
      .sort((a: any, b: any) => {
        return a.calculated_price.calculated_amount - b.calculated_price.calculated_amount
      })?.[0]

    return this.getPricesForVariant(cheapestVariant) ?? '0'
  }

  private getPricesForVariant(variant?: StoreProductVariant): string | undefined {
    if (!variant?.calculated_price?.calculated_amount) {
      return undefined
    }

    if (!variant?.calculated_price?.currency_code) {
      return undefined
    }

    return convertToLocale({
      amount: variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code,
    })
  }

  public onProductTap(index: number): void {
    void this.routeTo(
      { name: 'AppHome/Product' },
      {
        props: { id: this.product.id },
        transition: SharedTransition.custom(new PageTransition()),
      },
    )
  }
}
</script>
