import { App } from './src/app'

const port = process.env.PORT || 3333

const app = new App(port)

app.start()
