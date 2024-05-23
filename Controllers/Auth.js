const axios = require("axios");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mysql = require("mysql");
const crypto = require("crypto");
const { decryptRequest, encryptRequest } = require("../utils/crypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

// var con = require("../Config/db");

const { ROUNDS, HOST, USER, PASSWORD, DATABASE, JWTKEY } = process.env;

var con = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	multipleStatements: false,
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connection done");
});

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  let passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  if (passwordRegex.test(password)) {
    let sqlQuery =
      "select id,name,email,access,last_login from pispl.users where email=?";
    con.query(sqlQuery, [email], (err, result) => {
      if (err) {
        res.send("Error Caught!!!");
      } else {
        if (result.length > 0) {
          res.send("Users Already Exists");
        } else {
          bcrypt.hash(password, 10, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
              res.send("Error caught@@@");
            } else {
              let saveSqlQuery =
                "Insert into pispl.users(name,email,password) values (?,?,?);";
              con.query(saveSqlQuery, [name, email, hash], (err, result) => {
                if (err) {
                  res.send("Error caught$$$");
                } else {
                  res
                    .status(200)
                    .json({ message: "User got registered with us" });
                }
              });
            }
          });
        }
      }
    });
  } else {
    res.status(400).json({
      message:
        "Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character.",
    });
  }
};

module.exports.login = async (req, res) => {
  const { Request } = req.body;
  let requestData = await decryptRequest(Request);
  const { email, password } = JSON.parse(requestData);
  console.log("Email ----> ", email, password);
  let loginSqlQuery = `SELECT id,name,email,password,access,last_login FROM pispl.users WHERE email = ? and incorrect_password_attempts < 5;`;
  con.query(loginSqlQuery, [email], (err, result) => {
    // user does not exists
    if (err) {
      //throw err;
      return res.status(400).send({
        msg: "Email or password is incorrect!!!",
      });
    }
    if (!result.length) {
      return res.status(400).send({
        msg: "Email or password is incorrect!@@",
      });
    }
    // check password
    bcrypt.compare(password, result[0]["password"], async (bErr, bResult) => {
      // wrong password
      if (bErr) {
        // throw bErr;
        return res.status(400).send({
          msg: "Email or password is incorrect!",
        });
      }
      if (bResult) {
        console.log("LOGIN RESULT IS -----> ", result);
        let session = req.session;
        let userDetailForProfile = await encryptRequest({
          name: result[0].name,
          email: result[0].email,
          access: result[0].access ? result[0].access : "User",
        });
        const token = jwt.sign(
          { id: result[0].id, data: userDetailForProfile },
          JWTKEY,
          {
            expiresIn: 60 * 60, /// Expiration Time Is 1 Hour
          }
        );
        // let lastloginTime = new Date().toLocaleString();
        const parsedDatetime = moment(new Date(), "D/M/YYYY, h:mm:ss a");

        // Convert to IST (Indian Standard Time)
        const istDatetime = parsedDatetime
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss");
        console.log(istDatetime);
        console.log("LAST LOGIN TIME ", istDatetime);
        let updateQuery = `UPDATE ${DATABASE}.users SET last_login =? ,incorrect_password_attempts = 0 WHERE id = ?;`;
        con.query(updateQuery, [istDatetime, result[0].id]);
        let responseData = await encryptRequest({
          token: token,
          session: session,
          name: result[0]["name"],
        });
        return res.status(200).json({
          responseData,
        });
      } else {
        // let lastloginTime = new Date().toLocaleString();
        // console.log("LAST LOGIN TIME ", lastloginTime);
        const parsedDatetime = moment(new Date(), "D/M/YYYY, h:mm:ss a");

        // Convert to IST (Indian Standard Time)
        const istDatetime = parsedDatetime
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss");
        console.log(istDatetime);
        console.log("LAST LOGIN TIME ", istDatetime);
        let updateQuery2 =
          "UPDATE pispl.users SET incorrect_password_attempts = incorrect_password_attempts + 1 ,last_incorrect_login = ? WHERE id = ?;";
        con.query(updateQuery2, [istDatetime, result[0].id]);
      }
      return res.status(404).send({
        msg: "Email or password is incorrect!???",
      });
    });
  });
};

const emailFunction = async (email, resettoken) => {
	let reseturl = `https://pispl.app-assertai.com/resetpassword?token=${resettoken}`;
	const transport = nodemailer.createTransport({
    service: "gmail",
    maxMessages: 500,
    auth: {
      user: process.env.ALPHA_MAIL_USER,
      pass: process.env.ALPHA_MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  await transport.sendMail({
    from: process.env.ALPHA_MAIL_USER,
    to: email,
    subject: "Reset Password Link",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .email-container {
        background-color: #ffffff;
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007BFF;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
    }
    .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
    }
</style>
</head>
<body>
<div class="email-container">
    <h1>Reset Your Password</h1>
    <p>Hi ${email.split("@")[0].split(".").join(" ")},</p>
    <p>You recently requested to reset your password for your account. Click the button below to reset it.</p>
    <a href="${reseturl}" class="button">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    <p>Thanks,<br>PISPL Team (Assert SecureTech)</p>
    <div class="footer">
        <p>© Assert SecureTech Pvt. Ltd.</p>
    </div>
</div>
</body>
</html>`,
  });
};

module.exports.forgotPassword = (req, res) => {
	const { email } = req.body;
	try {
    let userEmailSqlQuery = `Select id,reset_password_attempts, email from ${DATABASE}.users where email=?`;
    con.query(userEmailSqlQuery, [email], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error Caught" });
      } else {
        if (result.length > 0) {
          if (result[0].reset_password_attempts < 5) {
            let token = jwt.sign({ id: result[0]?.id }, JWTKEY, {
              expiresIn: 60 * 10,
            });
            let idSqlQuery = `select userid from ${DATABASE}.resetpassword where userid=?`;
            con.query(idSqlQuery, [result[0].id], (err, idresult) => {
              if (idresult.length > 0) {
                let updateResetTokenSqlQuery = `Update ${DATABASE}.resetpassword set resettokens=? ,used=? where userid=?`;
                con.query(
                  updateResetTokenSqlQuery,
                  [token, 0, result[0].id],
                  (err, result) => {
                    if (err) {
                      res.status(500).json({ message: "Error Caught" });
                    } else {
                      emailFunction(email, token);
                      res.status(200).json({
                        message:
                          "Check Your Mail. A Link has been sent for password reset.",
                      });
                    }
                  }
                );
              } else {
                let idUpdateSqlQuery = `insert into ${DATABASE}.resetpassword (userid,resettokens,used) values(?,?,?)`;
                con.query(
                  idUpdateSqlQuery,
                  [result[0].id, token, 0],
                  (err, result) => {
                    if (err) {
                      res.status(500).json({ message: "Error Caught" });
                    } else {
                      emailFunction(email, token);
                      res.status(200).json({
                        message:
                          "Check Your Mail. A Link has been sent for password reset.",
                      });
                    }
                  }
                );
              }
            });
          } else {
            let sqlQuery = `update ${DATABASE}.users set last_reset_password_attempt=now(), reset_password_attempts=0 where email = ?`;
            con.query(sqlQuery, [email], (err, result) => {});
            res.status(400).json({
              message: "Reached Your Reset Password Limit.Try After Some Time.",
            });
          }
        } else {
          res.status(404).json({
            message:
              "If User is Valid then mail has been sent to his/her email.",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: `Error Caught :- ${error}` });
  }
};
module.exports.resetPassword = (req, res) => {
	const { token } = req.query;
	const { password } = req.body;
	let decodedToken = jwt.decode(token);
	if (decodedToken) {
		let { exp, id } = decodedToken;
		if (exp > Math.round(new Date().getTime() / 1000)) {
			let idSqlQuery = `select used from ${DATABASE}.resetpassword where userid=?`;
			con.query(idSqlQuery, [id], (err, result) => {
				if (err) {
					res.status(500).json({ message: "Error Caught." });
				} else {
					if (result.length > 0) {
						if (result[0].used == 0) {
							bcrypt.hash(password, 10, (err, hash) => {
								if (err) {
									console.error("Error hashing password:", err);
									res.status(400).json({ message: "Error hashing password." });
								} else {
									// Store the hash in your database
									let sqlQuery = `update ${DATABASE}.users set password = ? , last_reset_password_attempt=now(), reset_password_attempts=reset_password_attempts+1  where id = ?`;
									let updateUsedSqlQuery = `update ${DATABASE}.resetpassword set used=1 where userid=?`;
									con.query(updateUsedSqlQuery, [id], (err, result) => {});
									con.query(sqlQuery, [hash, id], (err, result) => {
										if (err) {
											res.status(400).json({ message: "Error while updating password." });
										} else {
											res.status(200).json({ message: "Password has been updated." });
										}
									});
								}
							});
						} else {
							if (exp > Math.round(new Date().getTime() / 1000)) {
								res
									.status(400)
									.json({ message: "Link has been Used.Try with latest reset link." });
							} else {
								res.status(400).json({ message: "Link has been Expired." });
							}
						}
					}
				}
			});
		} else {
			res.status(400).json({ message: "Link has been Expired." });
		}
	}
};

// module.exports.resetOldPassword = (req, res) => {
// 	const { email, oldPassword, newPassword } = req.body;
// 	let passwordRegex = new RegExp(
// 		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
// 	);
// 	if (passwordRegex.test(newPassword)) {
// 		let resetPasswordQuery =
// 			"SELECT id,name,email,access,last_login FROM pispl.users WHERE email = ?";
// 		con.query(resetPasswordQuery, [email], (err, result) => {
// 			// user does not exists
// 			if (err) {
// 				throw err;
// 				return res.status(400).send({
// 					msg: err,
// 				});
// 			}
// 			if (!result.length) {
// 				return res.status(200).send({
// 					msg: "Email or password is incorrect!",
// 				});
// 			} else {
// 				bcrypt.hash(newPassword, 10, (err, hash) => {
// 					if (err) {
// 						return res.status(500).send({
// 							msg: err,
// 						});
// 					} else {
// 						let passwordUpdateQuery =
// 							"UPDATE pispl.users SET password=? where email= ? ;";
// 						// has hashed pw => add to database
// 						con.query(passwordUpdateQuery, [hash, result[0].email], (err, result) => {
// 							if (err) {
// 								throw err;
// 								return res.status(400).send({
// 									msg: err,
// 								});
// 							}
// 							return res.status(201).send({
// 								msg: "The user password has been updated with us!",
// 							});
// 						});
// 					}
// 				});
// 			}
// 		});
// 	} else {
// 		res.status(400).json({
// 			message:
// 				"Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character.",
// 		});
// 	}
// };
