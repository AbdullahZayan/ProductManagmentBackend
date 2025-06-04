const CryptoJS = require('crypto-js');
const SECRET = process.env.JWT_SECRET;

exports.encrypt = (data) => {
  return CryptoJS.AES.encrypt(data.toString(), SECRET).toString();
};

exports.decrypt = (encrypted) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
