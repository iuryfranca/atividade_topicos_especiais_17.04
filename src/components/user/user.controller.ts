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
    }

    console.log(
      'LOG TESTE: SENHA CADASTRADA DO USUÁRIO [' + newUser.userName + '] =>',
      decryptWithAES(newUser.password, userId)
    )

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
      UsersList.push(newUser)
    }

    res.send({
      success: statusRequest,
      message: mensagem,
    })
  }

  const Update = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Api running....' })
  }

  const Delete = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Api running....' })
  }

  return {
    List,
    Create,
    Update,
    Delete,
  }
}
