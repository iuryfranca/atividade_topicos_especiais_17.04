import fs from 'fs'

const ARQUIVO = `${__dirname}/../storage/users.json`

let users = Array()

function loadUsers() {
  console.log(ARQUIVO)

  if (!fs.existsSync(ARQUIVO)) fs.writeFileSync(ARQUIVO, JSON.stringify([]))

  const data = fs.readFileSync(ARQUIVO)

  users = JSON.parse(data.toString())

  return users
}

function saveUser(data: any) {
  users.push({
    id: users.length + 1,
    ...data,
  })

  fs.writeFileSync(ARQUIVO, JSON.stringify(users))
}

export { loadUsers, saveUser }
