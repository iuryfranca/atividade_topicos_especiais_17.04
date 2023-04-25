import { isValidateObjectReq } from '@/helpers/validate'
import { Request, Response } from 'express'

export interface IUsers {
  name: string
  email: string
  password: string
  userName: string
}

const inputs = [
  {
    name: 'name',
    message: 'A propriedade [name] não deve estar em indefinida/vazio!',
  },
  {
    name: 'userName',
    message: 'A propriedade [userName] não deve estar em indefinida/vazio!',
  },
  {
    name: 'email',
    message: 'A propriedade [email] não deve estar em indefinida/vazio!',
  },
  {
    name: 'password',
    message: 'A propriedade [password] não deve estar em indefinida/vazio!',
  },
]

export const UserController = () => {
  let UsersList: IUsers[] = []

  const getUsers = (req: Request, res: Response) => {
    res.status(200).json({ usersList: UsersList })
  }

  const postUsers = (req: Request, res: Response) => {
    let statusRequest = true
    let mensagem = 'Usuário salvo com sucesso!'

    const checkValidate = isValidateObjectReq(req, inputs)

    if (Array.isArray(checkValidate)) {
      statusRequest = false

      mensagem = checkValidate.join(',')
    }

    if (statusRequest) {
      UsersList.push(req.body)
    }

    res.send({
      success: statusRequest,
      message: mensagem,
    })
  }

  const putUsers = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Api running....' })
  }

  const deleteUser = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Api running....' })
  }

  return {
    getUsers,
    postUsers,
    putUsers,
    deleteUser,
  }
}
