import { Component, Vue } from 'vue-facing-decorator'

@Component
export default class LoadingMixin extends Vue {
  public loading!: boolean

  public setLoading(value: boolean): boolean {
    this.loading = value
    return this.loading
  }
}
