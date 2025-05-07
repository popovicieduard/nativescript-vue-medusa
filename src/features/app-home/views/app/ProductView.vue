<template>
  <page>
  <ui-layout use="core-default-layout" #default>
    <scroll-view>
      <flexbox-layout flexDirection="column">
        <NSImg
          :src="product ? product.thumbnail : undefined"
          stretch="aspectFill"
          class="h-full w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden"
          :sharedTransitionTag="`product-image-${id}`"
          width="150" height="500"
        />
        <template v-if="product">
          <flexbox-layout flexDirection="column" class="m-3">
            <label :text="product.title" class="text-2xl font-semibold text-gray-900" textWrap="true" />
            <label :text="selectedVariantPrice" class="text-xl text-blue-600 font-bold" />
          </flexbox-layout>

          <flexbox-layout v-if="product.variants?.length" flexDirection="column" class="m-3">
            <label text="Options" class="text-lg font-semibold text-gray-700" />
            <flexbox-layout flexDirection="row" justifyContent="space-between">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                :text="variant.title"
                class="rounded-md border border-gray-200"
                androidElevation="0"
                :class="{
                  'bg-blue-500 text-white border-blue-500': selectedVariantId === variant.id,
                  'bg-white text-gray-700 border-gray-300': selectedVariantId !== variant.id
                }"
                @tap="selectVariant(variant.id)"
              />
            </flexbox-layout>
          </flexbox-layout>

          <flexbox-layout flexDirection="column" class="m-3">
            <label text="Quantity" class="text-lg font-semibold text-gray-700" />
            <flexbox-layout flexDirection="row" justifyContent="center" alignItems="center" class="gap-2">
              <button text="-" class="h-12 w-12 bg-gray-200 text-2xl font-bold rounded-full test" @tap="decreaseQuantity" androidElevation="0" androidDynamicElevationOffset="0" />
              <label :text="quantity.toString()" class="text-xl font-semibold w-12 text-center" />
              <button text="+" class="h-12 w-12 bg-gray-200 text-2xl font-bold rounded-full" @tap="increaseQuantity" androidElevation="0" androidDynamicElevationOffset="0" />
            </flexbox-layout>
          </flexbox-layout>

          <flexbox-layout class="border-t border-gray-200 bg-white">
            <button
              class="w-full bg-blue-600 text-white text-lg font-semibold rounded-full"
              @tap="addToCart" 
            >
            <template v-if="!loading">
              Add to Cart 
            </template>
            <template v-else>
              Loading...
            </template>
            </button>
          </flexbox-layout>
        </template>
      </flexbox-layout>
    </scroll-view>
  </ui-layout>
</page>
</template>

<script lang="ts">
import { StoreProduct, StoreProductVariant } from '@medusajs/types'
import { Component, Watch } from 'vue-facing-decorator'
import LoadingMixin from '~/features/core/components/mixins/loading.mixin'
import MedusaMixin from '~/features/core/components/mixins/medusa.mixin'
import RouterMixin from '~/features/core/components/mixins/router.mixin'
import { RootAction, RootState, SET_CART_ID, type Action } from '~/features/core/store'
import { AsyncData } from '~/util/async-data.decorator'
import { Mixin } from '~/util/mixin'
import { convertToLocale } from '~/util/money'
import { StringProp } from '~/util/prop-decorators'

@Component
export default class ProductView extends Mixin(RouterMixin, MedusaMixin, LoadingMixin) {
  @StringProp(true)
  public id!: string

  @RootState
  public cartId?: string

  @RootAction
  private [SET_CART_ID]!: Action<string>

  public product!: StoreProduct
  public quantity: number = 1
  public selectedVariantId?: string
  public loaded: boolean = false

  @AsyncData()
  private async asyncData(): Promise<AsyncData<ProductView>> {
    const { product } = await this.medusa.store.product.retrieve(this.id, { fields: '*variants.calculated_price' })
    return { product }
  }

  public selectVariant(variantId: string): void {
    this.selectedVariantId = variantId
  }

  public increaseQuantity(): void {
    this.quantity++
  }

  public decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--
    }
  }

  public get selectedVariantPrice(): string {
    const variant = this.product?.variants?.find(v => v.id === this.selectedVariantId)
    if (!variant?.calculated_price) return this.productPrice(this.product)
    return this.getPricesForVariant(variant) ?? '$0.00'
  }

  public productPrice(product: StoreProduct): string {
    const cheapestVariant = product?.variants
      ?.filter(v => !!v.calculated_price)
      //@ts-expect-error
      .sort((a, b) => a?.calculated_price?.calculated_amount ?? 0 - b?.calculated_price?.calculated_amount ?? 0)?.[0]

    return this.getPricesForVariant(cheapestVariant) ?? '$0.00'
  }

  private getPricesForVariant(variant?: StoreProductVariant): string | undefined {
    if (!variant?.calculated_price?.calculated_amount || !variant?.calculated_price?.currency_code) {
      return undefined
    }
    return convertToLocale({
      amount: variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code,
    })
  }

  public async addToCart(): Promise<void> {
    if (!this.selectedVariantId) return
      this.setLoading(true)

    await this.validateCart()

    try {
      this.cartId && await this.medusa.store.cart.createLineItem(this.cartId, {
        variant_id: this.selectedVariantId,
        quantity: this.quantity,
      })
      void this.routeTo({ name: 'AppCart' })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      this.setLoading(false)
    }
  }

  public async validateCart(): Promise<void> {
    if (!this.cartId) {
      const { cart } = await this.medusa.store.cart.create({})
      await this[SET_CART_ID](cart.id)
    }
  }

  @Watch('product')
  private onProductChange(): void {
    this.selectedVariantId = this.product.variants?.[0]?.id
  }
}
</script>