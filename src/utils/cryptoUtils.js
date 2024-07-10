import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../constants'

/**
 * Encrypts data using AES encryption.
 * @param {string} data - The data to encrypt.
 * @returns {string} - The encrypted data.
 */
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

/**
 * Decrypts data using AES decryption.
 * @param {string} data - The data to decrypt.
 * @returns {string} - The decrypted data.
 */
const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

const cryptoData = {
  encryptData,
  decryptData
}

export default cryptoData
