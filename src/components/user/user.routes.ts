// Arquivo: base.routes.ts

import { Router } from 'express'
import { UserController } from './user.controller'

export class BaseRoutes {
  private router: Router = Router()

  private readonly controller = UserController()

  constructor() {
    this.controller = UserController()
    this.init()
  }

  private init(): void {
    this.router.get('/users', this.controller.getUsers)
    this.router.post('/users', this.controller.postUsers)
    this.router.put('/usuarios/:id', this.controller.putUsers)
    this.router.delete('/usuarios/:id', this.controller.deleteUser)
  }

  public routes(): Router {
    return this.router
  }
}
