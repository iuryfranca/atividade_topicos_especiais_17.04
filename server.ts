import { App } from './src/app'
import { initRoutes } from '@/api/routes'

const port = process.env.PORT || 3333

const app = new App(port)

app.start()
