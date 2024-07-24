const User = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const { decryptRequest, encryptRequest } = require("../utils/crypt");
const { successResponse, errorResponse } = require("../utils/Response");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

module.exports.getUsersList = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    let UsersList = await User.find().skip(skip).limit(limit);
    if (UsersList.length > 0) {
      let encryptedResponse = await encryptRequest({ data: UsersList });
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(200).json({ data: "List has been ended or No Users found." });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error Caught in Login :- ${error}`,
    });
  }
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
