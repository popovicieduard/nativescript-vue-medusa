<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
} from 'nativescript-vue';

const counter = ref(0);
const message = computed(() => {
  return `Not Found {N}-Vue app: ${counter.value}`;
});

function logMessage() {
  console.log('You have tapped the message!');
}
</script>

<template>
  <Frame>
    <Page>

      <GridLayout rows="*, auto, auto, *" class="px-4">
        <Label
          row="1"
          class="text-xl align-middle text-center text-gray-500"
          :text="message"
          @tap="logMessage"
        />
      </GridLayout>
    </Page>
  </Frame>
</template>
