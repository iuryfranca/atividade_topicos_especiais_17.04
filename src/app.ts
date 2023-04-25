import express, { Application } from 'express'
import { initRoutes } from './api/routes'
import logger from 'morgan'

export class App {
  private app: Application

  private port: string | number

  constructor(port: string | number) {
    this.app = express()

    this.port = port

    this.middleware()
    this.database()
    this.routes()
  }

  private middleware(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(logger('combined'))

    // TODO: config de CORS é uma medida de segurança importante para
    // proteger os recursos de um servidor contra solicitações maliciosas de
    // outros domínios.
  }

  private routes(): void {
    initRoutes(this.app)
  }

  private async database(): Promise<void> {
    // configuração da conexão com o banco de dados
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🏃 Server is running in: ${this.port}`)
    })
  }
}
