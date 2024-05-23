var CryptoJS = require("crypto-js");
require("dotenv").config();
const { CRYPTSECRETKEY } = process.env;

const encryptRequest = async (data) => {
	// Encrypt
	var ciphertext = CryptoJS.AES.encrypt(
		JSON.stringify(data),
		CRYPTSECRETKEY
	).toString();
	return ciphertext;
};

const decryptRequest = async (data) => {
	// Decrypt
	var bytes = CryptoJS.AES.decrypt(data, CRYPTSECRETKEY);
	var originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
};

module.exports = { encryptRequest, decryptRequest };
