const { encryptRequest, decryptRequest } = require("./crypt");

const successResponse = async (res, message, statusCode, status, data) => {
	data = await encryptRequest(data);
	let decryptedResponse = await decryptRequest(data);
	//console.log("Response method ", JSON.parse(decryptedResponse));
	let respData = {
		message,
		statusCode,
		status,
		data,
	};
	res.status(statusCode || 200).send(respData);
};
const errorResponse = (res, message, statusCode, status, data) => {
	let respData = {
		message,
		statusCode,
		status,
		data,
	};
	res.status(statusCode || 500).send(respData);
};

module.exports = { successResponse, errorResponse };
