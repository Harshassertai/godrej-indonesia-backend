const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWTKEY } = process.env;

function isAuthenticated(req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(400).json({ message: "Token is not provided." });
		return;
	}
	const token = authorization.split(" ")[1];
	jwt.verify(token, JWTKEY, (err, decodedToken) => {
		if (err) {
			let { expiredAt } = err;
			return res.status(400).json({
				message: "Token Expired,Login Again.",
				//expiredAt: new Date(expiredAt).toLocaleString(),
			});
		} else {
			next();
		}
	});
}
function verifyRefresh(token) {
	const decoded = jwt.verify(token, "refreshSecret");
	return decoded.email;
}

module.exports = { isAuthenticated, verifyRefresh };
