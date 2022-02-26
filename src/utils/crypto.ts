import * as CryptoJS from 'crypto-ts'

export default {
  AES_KEY: 'mt',
  cryptoEncode(data: string): string {
    if (typeof data !== 'string') return ''
    // 加密
    const key = CryptoJS.enc.Utf8.parse(this.AES_KEY)
    const str = JSON.stringify(data)
    const encryptedData = CryptoJS.AES.encrypt(str, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.PKCS7,
      iv: CryptoJS.enc.Utf8.parse(this.AES_KEY)
    })
    return encryptedData.toString()
  },
  // 解密
  cryptoDecode(data: string): string {
    if (typeof data !== 'string') return ''
    const encryptedHexStr = CryptoJS.enc.Utf8.parse(data)
    const encryptedBase64Str = CryptoJS.enc.Utf8.stringify(encryptedHexStr)
    const key = CryptoJS.enc.Utf8.parse(this.AES_KEY)
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.PKCS7,
      iv: CryptoJS.enc.Utf8.parse(this.AES_KEY)
    })
    return decryptedData.toString(CryptoJS.enc.Utf8)
  }
}
