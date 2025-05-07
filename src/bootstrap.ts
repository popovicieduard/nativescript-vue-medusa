import container from '@/util/container'
import { once } from 'lodash'

export default once(() => container(import.meta.webpackContext('./features', { recursive: true, regExp: /\.builder\.ts$/, mode:'lazy-once' })))
