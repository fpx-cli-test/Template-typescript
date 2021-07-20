/**
 * @description 登录密码加密&生成随机数
 * @author yanhoup
 */
import CryptoJS from 'crypto-js';

class CryptoUtil {
  /**
   * aes加密
   * @param theKey 密钥
   * @param pass 密码(原文)
   */
  encrypt(theKey, pass) {
    const key = CryptoJS.enc.Utf8.parse(theKey);
    const srcs = CryptoJS.enc.Utf8.parse(pass);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  }

  /**
   * aes解密
   * @param theKey 密钥
   * @param pass 密码(密文)
   */
  decrypt(theKey, pass) {
    const key = CryptoJS.enc.Utf8.parse(theKey);
    const decrypt = CryptoJS.AES.decrypt(pass, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
  /**
   * 生成密钥
   * @param n 生成多少位的密钥(默认8位)
   */
  getKey(n) {
    const chars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    if (!n) {
      n = 8;
    }
    let res = '';
    for (let i = 0; i < n; i++) {
      const id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  }
}
const { encrypt, decrypt, getKey } = new CryptoUtil();

export { encrypt, decrypt, getKey };
