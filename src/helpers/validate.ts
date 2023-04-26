export function isValidadeRequest(req: any, inputs: string[]) {
  if (inputs.length == 0) return false

  for (let i = 0; i < inputs.length; i++) {
    if (req.body[inputs[i]] == undefined || req.body[inputs[i]] == '')
      return false
  }
  return true
}

export function isValidateObjectReq(req: any, inputs: any[]) {
  let message = []

  for (let i = 0; i < inputs.length; i++) {
    if (req.body[inputs[i].name] == undefined || req.body[inputs[i].name] == '')
      message.push(inputs[i].message)
  }
  return message.length == 0 ? true : message
}

export function isValidateAlreadyObjectData(
  req: any,
  data: any[],
  inputs: any[]
) {
  if (data.length === 0) return false

  let message: string[] = []

  const isValidateAlready = data.some((user) => {
    for (let i = 0; i < inputs.length; i++) {
      if (req.body[inputs[i].name] === user[inputs[i].name]) {
        message.push(inputs[i].message)
      }
    }
    return true
  })
  return message.length > 0 ? message : false
}
