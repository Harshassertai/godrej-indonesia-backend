const mysql = require("mysql");
const { encryptRequest, decryptRequest } = require("../utils/crypt");
const { HOST, USER, PASSWORD, DATABASE } = process.env;
var con = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	multipleStatements: false,
});

module.exports.getEntryCount = (req, res) => {
  const { startDate, startTime, endDate, endTime, TabNo } = req.body;
  const sqlQuery = `select count(*) as entry_count from ${DATABASE}.alerts where date between ? and ? and (time >= ? AND time <= ?) and alert='Entry';`;

  con.query(
    sqlQuery,
    [startDate, endDate, startTime, endTime],
    async (err, result) => {
      if (result?.length > 0) {
        let encryptedResponse = await encryptRequest(result[0].entry_count);
        let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: "No Data" });
      }
    }
  );
};

module.exports.getExitCount = (req, res) => {
  const { startDate, startTime, endDate, endTime, TabNo } = req.body;
  const sqlQuery = `select count(*) as exit_count from ${DATABASE}.alerts where date between ? and ? and (time >= ? AND time <= ?) and alert='Exit';`;

  con.query(
    sqlQuery,
    [startDate, endDate, startTime, endTime],
    async (err, result) => {
      if (result?.length > 0) {
        console.log("");
        let encryptedResponse = await encryptRequest(result[0].exit_count);
        let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: "No Data" });
      }
    }
  );
};

module.exports.getTotalCount = (req, res) => {
  const { startDate, startTime, endDate, endTime, TabNo } = req.body;
  console.log("Tab No ", TabNo);
  if (TabNo == undefined) {
    const sqlQuery = `select count(*) as count from ${DATABASE}.alerts where date between ? and ? and (time >= ? AND time <= ?) and alert NOT IN ('Vehicle Turn Around Time');`;

    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime],
      async (err, result) => {
        if (result?.length > 0) {
          console.log("");
          let encryptedResponse = await encryptRequest(result[0].count);
          let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: "No Data" });
        }
      }
    );
  }
};
module.exports.getTatCount = (req, res) => {
  const { startDate, startTime, endDate, endTime, TabNo } = req.body;
  console.log("Tab No ", TabNo);
  if (TabNo == undefined) {
    const sqlQuery = `select count(*) as count from ${DATABASE}.alerts where date between ? and ? and (time >= ? AND time <= ?) and alert='Vehicle Turn Around Time';`;

    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime],
      async (err, result) => {
        if (result?.length > 0) {
          console.log("");
          let encryptedResponse = await encryptRequest(result[0].count);
          let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: "No Data" });
        }
      }
    );
  }
};
