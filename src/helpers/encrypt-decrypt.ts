import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

export const encryptWithAES = (text: string, passphrase: string) => {
  return AES.encrypt(text, passphrase).toString()
}

export const decryptWithAES = (ciphertext: string, passphrase: string) => {
  const bytes = AES.decrypt(ciphertext, passphrase)
  const originalText = bytes.toString(Utf8)
  return originalText
}
