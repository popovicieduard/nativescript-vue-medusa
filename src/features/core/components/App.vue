<template>
  <frame v-bind="attrs">
    <layout-engine default-layout="core-default-layout">
      <router-view/>
    </layout-engine>
  </frame>
</template>

<script lang="ts">
import LayoutEngine from '@/features/ui/layout/layout-engine';
import { RouterView } from 'router-vue-native';
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  components: { LayoutEngine, RouterView }
})
export default class App extends Vue {
  public get attrs(): Record<string, unknown> {
    return {
      actionBarVisibility: 'never'
    }
  }
}
</script>