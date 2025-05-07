import 'web-streams-polyfill/polyfill'
import './polyfills'

import container from '@/bootstrap'
import { APP, CONTAINER } from './features/core/container'

void (async () => {
  const get = await container()

  const app = get(APP)
  app.provide(CONTAINER, get)

  return app.start()
})().catch((err) => {
  console.error('Uncaught error during app start:', err?.stack || err)
})
