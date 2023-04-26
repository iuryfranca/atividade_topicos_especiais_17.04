// Arquivo: base.routes.ts

import { Router } from 'express'
import { UserController } from './user.controller'

export class UserRoutes {
  private router: Router = Router()

  private readonly controller = UserController()

  constructor() {
    this.controller = UserController()
    this.init()
  }

  private init(): void {
    this.router.get('/users', this.controller.List)
    this.router.post('/users', this.controller.Create)
    this.router.put('/users/:id', this.controller.Update)
    this.router.delete('/users/:id', this.controller.Delete)
  }

  public routes(): Router {
    return this.router
  }
}
