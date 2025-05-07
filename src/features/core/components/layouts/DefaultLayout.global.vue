<template >
	<slot v-bind="$attrs"></slot>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'

@Component
export default class DefaultLayout extends Vue {
}
</script>
