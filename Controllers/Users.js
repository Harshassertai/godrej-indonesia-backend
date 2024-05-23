const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { encryptRequest, decryptRequest } = require("../utils/crypt");
const { successResponse, errorResponse } = require("../utils/Response");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  multipleStatements: false,
});

module.exports.getUsersList = (req, res) => {
  let sqlQuery = `select name,email,last_login,access from ${DATABASE}.users`;
  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      let dataOfUsers = result.map((item) => {
        return {
          ...item,
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        };
      });
      //let encryptedResponse = await encryptRequest(dataOfUsers);
      //let decryptedResponse = await decryptRequest(encryptedResponse);
      return successResponse(res, "User List", 200, true, dataOfUsers);
      // res.status(200).json({ data: encryptedResponse });
    } else {
      return errorResponse(res, "Something Went Wrong", 404, false, err);
      //res.status(400).json({ message: `${err}` });
    }
  });
};

module.exports.deleteUser = (req, res) => {
  const { email } = req.body;
  let sqlQuery = `select email from ${DATABASE}.users where email='${email}'`;
  con.query(sqlQuery, (err, result) => {
    if (result?.length > 0) {
      let deleteSqlQuery = `DELETE FROM ${DATABASE}.users where email='${email}'`;
      con.query(deleteSqlQuery, (err, result) => {});
      //console.log(result.affectedRows);
      return successResponse(
        res,
        "User List",
        200,
        true,
        "User Deleted Successfully"
      );
      // res.status(200).json({ data: encryptedResponse });
    } else {
      return errorResponse(res, "No Users Found.", 404, false, err);
      //res.status(400).json({ message: `${err}` });
    }
  });
};

module.exports.editUser = (req, res) => {
  const { requestedEmail, email, password, access, name } = req.body;
  let passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  if (passwordRegex.test(password)) {
    bcrypt.hash(password, 10, function (err, hash) {
      let updateSqlQuery = `UPDATE ${DATABASE}.users set access='${access}',name='${name}',email='${email}',password='${hash}' where email='${requestedEmail}'`;
      con.query(updateSqlQuery, (err, result) => {
        return successResponse(
          res,
          "User Updated Successfully",
          200,
          true,
          result
        );
      });
    });
  } else {
    res.status(400).json({
      message:
        "Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character.",
    });
  }
};
