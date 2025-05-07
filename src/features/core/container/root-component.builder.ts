import { builder } from '@/util/container'
import { h } from 'nativescript-vue'
import { ROOT_COMPONENT } from '.'
import App from '../components/App.vue'

export default builder(({ provide }) => {
  provide(ROOT_COMPONENT, async () => {
    return h(App)
  })
})
