const mysql = require("mysql");
const MySql = require("sync-mysql");
let nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { encryptRequest, decryptRequest } = require("../utils/crypt");
const { successResponse, errorResponse } = require("../utils/Response");
const { sendmailusingnodemailer } = require("../utils/sendMail");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  multipleStatements: false,
});

var connection = new MySql({
  host: HOST,
  user: USER,
  password: PASSWORD,
});

function getNextSerial() {
  const sqlQuery = `select * from pispl.TicketRaised order by id desc limit 1;`;
  let number = 1;
  let result = connection.query(sqlQuery);

  if (result[0].id) {
    number = number + 1000 + result[0].id;
    if (number > 10000 && number < 99999) {
      number = number + 1;
      number = number + 1000 + result[0].id;
    }
  }
  return number;
}
module.exports.support = async (req, res) => {
  const { email, description, camera } = req.body;
  let sqlQuery = `select name,email from ${DATABASE}.users where email='${email}'`;
  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      const randomNum = getNextSerial();
      sendmailusingnodemailer({
        from: "alpha@assertai.com",
        to: email,
        description: description,
        ticketNumber: randomNum,
        camera: camera ? camera : "",
      });
      let cameras = JSON.stringify(
        camera?.map((item) => {
          return item.label;
        })
      );

      let idUpdateSqlQuery = `insert into ${DATABASE}.TicketRaised (email,TicketNumber,Description,TicketRaisedDate,cameraByPass) values(?,?,?,?,?)`;

      con.query(
        idUpdateSqlQuery,
        [email, randomNum, description, new Date(), cameras],
        (err, result) => {
          if (err) {
            res.status(500).json({ message: `Error Caught :- ${err}` });
          } else {
            res.status(200).json({
              message: "Check Your Mail. A Link has been sent.",
            });
          }
        }
      );
    }
  });
};
