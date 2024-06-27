import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../constants';

// ENCRYPT FUNCTION
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// DECRYPRT FUNCTION
export const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}



