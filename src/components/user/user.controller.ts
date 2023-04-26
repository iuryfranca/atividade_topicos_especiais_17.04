import {
  isValidateAlreadyObjectData,
  isValidateObjectReq,
} from '../../helpers/validate'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'

import { decryptWithAES, encryptWithAES } from '../../helpers/encrypt-decrypt'
import {
  isValidateAlreadyObjectDataInputs,
  isValidateObjectReqInputs,
} from './user.erros'

export interface IUsers {
  id: string
  name: string
  email: string
  password: string
  userName: string
  active: true
}

export const UserController = () => {
  let UsersList: IUsers[] = []

  const List = (req: Request, res: Response) => {
    res.status(200).json({ usersList: UsersList })
  }

  const Create = (req: Request, res: Response) => {
    let statusRequest = true
    let mensagem = 'Usuário salvo com sucesso!'

    const userId = uuidv4()
    const newUser = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      password: encryptWithAES(req.body.password, userId),
      userName: req.body.userName,
      active: req.body.active,
    }

    const checkValidate = isValidateObjectReq(req, isValidateObjectReqInputs)
    const checkValidateAlready = isValidateAlreadyObjectData(
      req,
      UsersList,
      isValidateAlreadyObjectDataInputs
    )

    if (Array.isArray(checkValidate)) {
      statusRequest = false

      mensagem = checkValidate.join(',')
    }

    if (checkValidateAlready !== false) {
      statusRequest = false

      mensagem = checkValidateAlready!.join(' | ')
    }

    if (statusRequest) {
      console.log(
        'LOG TESTE: SENHA CADASTRADA DO USUÁRIO [' + newUser.userName + '] =>',
        decryptWithAES(newUser.password, userId)
      )

      UsersList.push(newUser)
    }

    res.status(200).send({
      success: statusRequest,
      message: mensagem,
    })
  }

  const Update = (req: Request, res: Response) => {
    let statusRequest = true
    let mensagem = 'Usuário atualizado com sucesso!'

    const userId = req.params.id
    const oldUser = UsersList.find((user) => user.id === userId)
    const newUser = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      password: encryptWithAES(req.body.password, userId),
      userName: req.body.userName,
      active: req.body.active,
    }

    const checkValidate = isValidateObjectReq(req, isValidateObjectReqInputs)
    if (Array.isArray(checkValidate)) {
      statusRequest = false

      mensagem = checkValidate.join(',')
    }

    if (!oldUser) {
      statusRequest = false
      mensagem = 'Usuário não encontrado!'
    }

    if (statusRequest && oldUser) {
      UsersList.splice(UsersList.indexOf(oldUser), 1, { ...newUser } as IUsers)
    }

    res.status(201).send({
      success: statusRequest,
      message: mensagem,
    })
  }

  const Delete = (req: Request, res: Response) => {
    let statusRequest = true
    let mensagem = 'Usuário excluído com sucesso!'

    const userId = req.params.id
    const deleteUser = UsersList.find((user) => user.id === userId)

    if (!deleteUser) {
      statusRequest = false
      mensagem = 'Usuário não encontrado!'
    }

    if (statusRequest && deleteUser) {
      UsersList.splice(UsersList.indexOf(deleteUser), 1)
    }

    res.status(200).send({
      success: statusRequest,
      message: mensagem,
    })
  }

  return {
    List,
    Create,
    Update,
    Delete,
  }
}
