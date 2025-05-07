<template>
  <page>
    <ui-layout use="core-default-layout" #default>
      <flexbox-layout flexDirection="column" class="flex-1 bg-white">
        <scroll-view>
          <flexbox-layout flexDirection="column" class="p-6 space-y-6">
            <label text="Shopping Cart" class="text-2xl font-bold text-gray-900" />

            <!-- Item Row -->
            <flexbox-layout
              v-for="item in items"
              :key="item.id"
              flexDirection="row"
              alignItems="center"
              class="p-4 gap-x-4 bg-white border border-gray-200 rounded-xl"
            >
              <!-- Column 1: Image -->
              <flexbox-layout
                class="w-20 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200"
              >
                <image
                  v-if="item.thumbnail"
                  :src="item.thumbnail"
                  stretch="aspectFill"
                  class="w-full h-full"
                />
              </flexbox-layout>

              <!-- Column 2: Title + Quantity -->
              <flexbox-layout flexGrow="1" flexDirection="column" class="m-3">
                <label
                  :text="item.variant_title"
                  textWrap="true"
                  class="text-base font-medium text-gray-800 mb-2"
                />
                <flexbox-layout flexDirection="row" justifyContent="center" alignItems="center" class="gap-2">
                  <button text="-" class="h-12 w-12 bg-gray-200 text-2xl font-bold rounded-full test" @tap="decreaseQuantity(item)" androidElevation="0" androidDynamicElevationOffset="0" />
                  <label :text="item.quantity.toString()" class="text-xl font-semibold w-12 text-center" />
                  <button text="+" class="h-12 w-12 bg-gray-200 text-2xl font-bold rounded-full" @tap="increaseQuantity(item)" androidElevation="0" androidDynamicElevationOffset="0" />
                </flexbox-layout>
              </flexbox-layout>

              <!-- Column 3: Price -->
              <label
                :text="formatPrice(item.unit_price)"
                class="text-xl font-bold text-blue-600 text-right ml-2"
              />
            </flexbox-layout>

            <!-- Total -->
            <flexbox-layout v-if="items.length > 0" flexDirection="column" class="pt-4 border-t border-gray-200">
              <label :text="'Total: ' + formatPrice(total)" class="text-xl font-bold text-gray-900 mb-4" />
            </flexbox-layout>

            <!-- Empty -->
            <label v-else text="Your cart is empty" class="text-center text-gray-500 text-base mt-10" />
          </flexbox-layout>
        </scroll-view>

        <!-- Checkout -->
        <flexbox-layout v-if="items.length > 0" class="p-6 border-t border-gray-200 bg-white">
          <button
            text="Go to Checkout"
            class="bg-blue-600 text-white text-lg font-semibold py-4 rounded-full w-full"
            @tap="routeTo({ name: 'AppCheckout' })"
          />
        </flexbox-layout>
      </flexbox-layout>
    </ui-layout>
  </page>
</template>

<script lang="ts">
import { Component } from 'vue-facing-decorator';
import RouterMixin from '~/features/core/components/mixins/router.mixin';
import MedusaMixin from '~/features/core/components/mixins/medusa.mixin';
import { Mixin } from '~/util/mixin';
import { StoreCartLineItem } from '@medusajs/types/dist/http';
import { RootState } from '~/features/core/store';
import { AsyncData } from '~/util/async-data.decorator';

@Component
export default class AppView extends Mixin(RouterMixin, MedusaMixin) {
  @RootState
  private cartId?: string

  public items: StoreCartLineItem[] = [];
  public total: number = 0;

  @AsyncData()
  private async asyncData(): Promise<AsyncData<AppView>> {
    if (this.cartId === undefined) {
      return {
        items: [],
        total: 0
      }
    }

    const response = await this.medusa.store.cart.retrieve(this.cartId);
    const { items, total } = response.cart

    return {
      items,
      total
    }
  }

  public formatPrice(amount: number): string {
    return `$${amount}`;
  }

  public async increaseQuantity(item: any): Promise<void> {
    try {
      this.cartId && await this.medusa.store.cart.updateLineItem(this.cartId, item.id, {
        quantity: item.quantity + 1
      });
      await this.asyncData()
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  public async decreaseQuantity(item: any): Promise<void> {
    if (item.quantity > 1) {
      try {
        this.cartId && await this.medusa.store.cart.updateLineItem(this.cartId, item.id, {
          quantity: item.quantity - 1
        });
        await this.asyncData()
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  }

  public async removeItem(item: any): Promise<void> {
    try {
      this.cartId && await this.medusa.store.cart.deleteLineItem(this.cartId, item.id);
      await this.asyncData();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }
}
</script>

<style>
.cart-container {
  padding: 20;
}

.h1 {
  font-size: 24;
  font-weight: bold;
  margin-bottom: 20;
}

.h2 {
  font-size: 18;
  font-weight: bold;
}

.list-group {
  margin: 10 0;
}

.list-group-item {
  padding: 15;
  margin-bottom: 10;
  background-color: #ffffff;
  border-radius: 5;
}

.item-header {
  margin-bottom: 10;
}

.price {
  font-size: 16;
  color: #007AFF;
}

.quantity-controls {
  margin: 10 0;
}

.btn-quantity {
  width: 40;
  height: 40;
  font-size: 18;
}

.quantity {
  text-align: center;
  font-size: 18;
}

.btn-remove {
  background-color: #FF3B30;
  color: white;
  margin-top: 10;
  padding: 10;
  border-radius: 5;
}

.summary {
  margin-top: 20;
  padding: 20;
  background-color: #f5f5f5;
  border-radius: 5;
}

.btn-primary {
  background-color: #007AFF;
  color: white;
  margin-top: 20;
  padding: 15;
  border-radius: 5;
}

.empty-cart {
  text-align: center;
  font-size: 18;
  color: #666666;
  margin-top: 50;
}
</style> 