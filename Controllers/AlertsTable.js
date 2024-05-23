// const PDFDocument = require("pdfkit");
const axios = require("axios");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const path = require("path");
const mysql = require("mysql");
const MySql = require("sync-mysql");
const { encryptRequest, decryptRequest } = require("../utils/crypt");
const { query } = require("express");
const { HOST, USER, PASSWORD, DATABASE } = process.env;
// let pdftable = new PDFTable.register(PDFDocument);
var con = mysql.createConnection({
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

module.exports.getAlertListDateWise = (req, res) => {
  const { startDate, endDate, camera, alert, zone, person, status } = req.body;
  if (
    camera == null &&
    alert == null &&
    zone == null &&
    person == null &&
    status == null
  ) {
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? order by id desc;`;

    con.query(sqlQuery, [startDate, endDate], async (err, result) => {
      if (result?.length > 0) {
        let encryptedResponse = await encryptRequest(result);
        //let decryptedResponse = await decryptRequest(encryptedResponse);
        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: err });
      }
    });
  } else if (
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone == null &&
    person == null &&
    status == null
  ) {
    let camerasName = camera.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    alert != null &&
    alert.length != 0 &&
    camera == null &&
    zone == null &&
    person == null &&
    status == null
  ) {
    let alertsName = alert.map((item) => {
      return item.value;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and alert In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    zone != null &&
    zone.length != 0 &&
    camera == null &&
    alert == null &&
    person == null &&
    status == null
  ) {
    let zonesName = zone.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and zone In(?) order by id desc;`;
    con.query(
      sqlQuery,
      [startDate, endDate, zonesName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    person != null &&
    person.length != 0 &&
    camera == null &&
    alert == null &&
    zone == null &&
    status == null
  ) {
    let personName = person.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and usersAssigned In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, personName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    status != null &&
    status.length != 0 &&
    camera == null &&
    alert == null &&
    zone == null &&
    person == null
  ) {
    let statusName = status.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //1
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person == null &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and alert In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, alertsName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //2
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and alert In(?) and zone In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName, zonesName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //3
    camera == null &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and zone In(?) and usersAssigned In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, zonesName, personName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //3.1
    camera == null &&
    alert == null &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and usersAssigned In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, personName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //4
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and alert In(?) and usersAssigned In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName, personName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //4.1
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and alert In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //5
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and usersAssigned In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, personName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //5.1
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone == null &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //6
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status == null
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and zone In(?)  order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, zonesName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //6.1
    camera == null &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    zonesName = zone?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and zone In(?) and status In(?)  order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, zonesName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //1.1
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and alert In(?) and zone In(?) and usersAssigned In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName, zonesName, personName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //2
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and alert In(?) and zone In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, alertsName, zonesName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //2.1
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personsName = person?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and alert In(?) and zone In(?) and  usersAssigned In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, alertsName, zonesName, personsName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //2.1.1
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    statusName = status?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and status In(?) and zone In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, statusName, zonesName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //2.1.2
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    statusName = status?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    alertsName = alert?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and status In(?) and zone In(?) and alert In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, statusName, zonesName, alertsName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //2.1.3
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and  alert In(?) and zone In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName, zonesName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //3.1
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and alert In(?) and zone In(?) and usersAssigned In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, alertsName, zonesName, personName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //4
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and zone In(?) and usersAssigned In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, zonesName, personName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (
    //5
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and alert In(?) and usersAssigned In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [startDate, endDate, camerasName, alertsName, personName, statusName],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? and camera In(?) and alert In(?) and zone In(?) and usersAssigned In(?) and status In(?) order by id desc;`;

    con.query(
      sqlQuery,
      [
        startDate,
        endDate,
        camerasName,
        alertsName,
        zonesName,
        personName,
        statusName,
      ],
      async (err, result) => {
        if (result?.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          //let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  }
};
function getOneDayBefore(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Subtract one day from the date
  date.setDate(date.getDate() - 1);

  // Extract the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Return the formatted date string in 'YYYY-MM-DD' format
  return `${year}-${month}-${day}`;
}

module.exports.getAlertList = async (req, res) => {
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    camera,
    alert,
    zone,
    person,
    status,
  } = req.body;
  let oneDayBackEndDate = "";
  if (startDate != endDate) {
    oneDayBackEndDate = getOneDayBefore(endDate);
  }

  if (
    camera == null &&
    alert == null &&
    zone == null &&
    person == null &&
    status == null
  ) {
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') order by id desc;`;
      let result = connection.query(sqlQuery);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') order by id desc;`;
      let result1 = connection.query(sqlQuery1);

      let resultAsResponse = result1.concat(result);

      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') order by id desc;`;
      let result1 = connection.query(sqlQuery1);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone == null &&
    person == null &&
    status == null
  ) {
    let camerasName = camera.map((item) => {
      return item.label;
    });
    const placeholders = camerasName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and camera In(${placeholders}) order by id desc;`;
      let result = connection.query(sqlQuery, camerasName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and camera In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, camerasName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and camera In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, camerasName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    alert != null &&
    alert.length != 0 &&
    camera == null &&
    zone == null &&
    person == null &&
    status == null
  ) {
    let alertsName = alert.map((item) => {
      return item.value;
    });
    const placeholders = alertsName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholders}) order by id desc;`;
      let result = connection.query(sqlQuery, alertsName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, alertsName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, alertsName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    zone != null &&
    zone.length != 0 &&
    camera == null &&
    alert == null &&
    person == null &&
    status == null
  ) {
    let zonesName = zone.map((item) => {
      return item.label;
    });
    if (endDate != startDate) {
      const placeholders = zonesName.map(() => "?").join(", ");
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and zone In(${placeholders}) order by id desc;`;
      let result = connection.query(sqlQuery, zonesName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and zone In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, zonesName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and zone In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, zonesName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    person != null &&
    person.length != 0 &&
    camera == null &&
    alert == null &&
    zone == null &&
    status == null
  ) {
    let personName = person.map((item) => {
      return item.label;
    });
    if (endDate != startDate) {
      const placeholders = personName.map(() => "?").join(", ");
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and usersAssigned In(${placeholders}) order by id desc;`;
      let result = connection.query(sqlQuery, personName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and usersAssigned In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, personName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and usersAssigned In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, personName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    status != null &&
    status.length != 0 &&
    camera == null &&
    alert == null &&
    zone == null &&
    person == null
  ) {
    let statusName = status.map((item) => {
      return item.label;
    });
    if (endDate != startDate) {
      const placeholders = statusName.map(() => "?").join(", ");
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and status In(${placeholders}) order by id desc;`;
      let result = connection.query(sqlQuery, statusName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and status In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, statusName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and status In(${placeholders}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, statusName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //1
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person == null &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and camera In(${placeholder2}) order by id desc;`;
      let result = connection.query(sqlQuery, alertsName, camerasName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, alertsName, camerasName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, alertsName, camerasName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //2
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = zonesName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and zone In(${placeholder2}) order by id desc;`;
      let result = connection.query(sqlQuery, alertsName, zonesName);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, alertsName, zonesName);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) order by id desc;`;
      let result1 = connection.query(sqlQuery1, alertsName, zonesName);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //3
    camera == null &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });

    const placeholder1 = zonesName.map(() => "?").join(", ");
    const placeholder2 = personName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and zone In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...zonesName, ...personName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and zone In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...zonesName, ...personName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and zone In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...zonesName, ...personName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //3.1
    camera == null &&
    alert == null &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const placeholder1 = personName.map(() => "?").join(", ");
    const placeholder2 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and usersAssigned In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...personName, ...statusName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and usersAssigned In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...personName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and usersAssigned In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...personName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //4
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    personName = person?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = personName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...alertsName, ...personName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...alertsName, ...personName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...alertsName, ...personName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //4.1
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...alertsName, ...statusName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...alertsName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...alertsName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //5
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    const placeholder1 = camerasName.map(() => "?").join(", ");
    const placeholder2 = personName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and camera In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...camerasName, ...personName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and camera In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...camerasName, ...personName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and camera In(${placeholder1}) and usersAssigned In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...camerasName, ...personName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //5.1
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone == null &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = camerasName.map(() => "?").join(", ");
    const placeholder2 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and camera In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...camerasName, ...statusName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and camera In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...camerasName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and camera In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...camerasName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //6
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status == null
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });

    const placeholder1 = camerasName.map(() => "?").join(", ");
    const placeholder2 = zonesName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and camera In(${placeholder1}) and zone In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...camerasName, ...zonesName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and camera In(${placeholder1}) and zone In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...camerasName, ...zonesName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and camera In(${placeholder1}) and zone In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...camerasName, ...zonesName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //6.1
    camera == null &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    zonesName = zone?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = zonesName.map(() => "?").join(", ");
    const placeholder2 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and zone In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues1 = [...zonesName, ...statusName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and zone In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...zonesName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and zone In(${placeholder1}) and status In(${placeholder2}) order by id desc;`;
      const queryValues2 = [...zonesName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //1.1
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = zonesName.map(() => "?").join(", ");
    const placeholder3 = personName.map(() => "?").join(", ");
    const placeholder4 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues1 = [
        ...alertsName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //2
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    const placeholder3 = zonesName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) order by id desc;`;
      const queryValues1 = [...alertsName, ...camerasName, ...zonesName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) order by id desc;`;
      const queryValues2 = [...alertsName, ...camerasName, ...zonesName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) order by id desc;`;
      const queryValues2 = [...alertsName, ...camerasName, ...zonesName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //2.1
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status == null
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personsName = person?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    const placeholder3 = zonesName.map(() => "?").join(", ");
    const placeholder4 = personsName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and usersAssigned In(${placeholder4}) order by id desc;`;
      const queryValues1 = [
        ...alertsName,
        ...camerasName,
        ...zonesName,
        ...personName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and usersAssigned In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...camerasName,
        ...zonesName,
        ...personName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and usersAssigned In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...camerasName,
        ...zonesName,
        ...personName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //2.1.1
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    statusName = status?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });

    const placeholder1 = statusName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    const placeholder3 = zonesName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and status In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) order by id desc;`;
      const queryValues1 = [...statusName, ...camerasName, ...zonesName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and status In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) order by id desc;`;
      const queryValues2 = [...statusName, ...camerasName, ...zonesName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and status In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) order by id desc;`;
      const queryValues2 = [...statusName, ...camerasName, ...zonesName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //2.1.2
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    statusName = status?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    alertsName = alert?.map((item) => {
      return item.label;
    });
    const placeholder1 = statusName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    const placeholder3 = zonesName.map(() => "?").join(", ");
    const placeholder4 = alertsName.map(() => "?").join(", ");

    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and status In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and alert In(${placeholder4}) order by id desc;`;
      const queryValues1 = [
        ...statusName,
        ...camerasName,
        ...zonesName,
        ...alertsName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and status In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and alert In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...statusName,
        ...camerasName,
        ...zonesName,
        ...alertsName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and status In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and alert In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...statusName,
        ...camerasName,
        ...zonesName,
        ...alertsName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //2.1.3
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person == null &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = zonesName.map(() => "?").join(", ");
    const placeholder3 = statusName.map(() => "?").join(", ");

    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and zone In(${placeholder2}) and status In(${placeholder3}) order by id desc;`;
      const queryValues1 = [...alertsName, ...zonesName, ...statusName];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) and status In(${placeholder3}) order by id desc;`;
      const queryValues2 = [...alertsName, ...zonesName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) and status In(${placeholder3}) order by id desc;`;
      const queryValues2 = [...alertsName, ...zonesName, ...statusName];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //3.1
    camera == null &&
    alert != null &&
    alert?.length != 0 &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = zonesName.map(() => "?").join(", ");
    const placeholder3 = personName.map(() => "?").join(", ");
    const placeholder4 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues1 = [
        ...alertsName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //4
    camera != null &&
    camera?.length != 0 &&
    alert == null &&
    zone != null &&
    zone?.length != 0 &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const placeholder1 = camerasName.map(() => "?").join(", ");
    const placeholder2 = zonesName.map(() => "?").join(", ");
    const placeholder3 = personName.map(() => "?").join(", ");
    const placeholder4 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and camera In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues1 = [
        ...camerasName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and camera In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...camerasName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and camera In(${placeholder1}) and zone In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...camerasName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else if (
    //5
    camera != null &&
    camera?.length != 0 &&
    alert != null &&
    alert?.length != 0 &&
    zone == null &&
    person != null &&
    person?.length != 0 &&
    status != null &&
    status?.length != 0
  ) {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });

    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    const placeholder3 = personName.map(() => "?").join(", ");
    const placeholder4 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and camera In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues1 = [
        ...alertsName,
        ...camerasName,
        ...personName,
        ...statusName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...camerasName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') and alert In(${placeholder1}) and camera In(${placeholder2}) and usersAssigned In(${placeholder3}) and status In(${placeholder4}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...camerasName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);
      let encryptedResponse = await encryptRequest(result1);
      res.status(200).json({ data: encryptedResponse });
    }
  } else {
    alertsName = alert?.map((item) => {
      return item.value;
    });
    camerasName = camera?.map((item) => {
      return item.label;
    });
    zonesName = zone?.map((item) => {
      return item.label;
    });
    personName = person?.map((item) => {
      return item.label;
    });
    statusName = status?.map((item) => {
      return item.label;
    });
    const placeholder1 = alertsName.map(() => "?").join(", ");
    const placeholder2 = camerasName.map(() => "?").join(", ");
    const placeholder3 = zonesName.map(() => "?").join(", ");
    const placeholder4 = personName.map(() => "?").join(", ");
    const placeholder5 = statusName.map(() => "?").join(", ");
    if (endDate != startDate) {
      const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${startDate}' AND '${oneDayBackEndDate}' AND (time >= '${startTime}' and time <= '23:59:00') and alert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and usersAssigned In(${placeholder4}) and status In(${placeholder5}) order by id desc;`;
      const queryValues1 = [
        ...alertsName,
        ...camerasName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result = connection.query(sqlQuery, queryValues1);
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '00:00:00' and time <= '${endTime}') andalert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and usersAssigned In(${placeholder4}) and status In(${placeholder5}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...camerasName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      const sqlQuery1 = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN '${endDate}' AND '${endDate}' AND (time >= '${startTime}' and time <= '${endTime}') andalert In(${placeholder1}) and camera In(${placeholder2}) and zone In(${placeholder3}) and usersAssigned In(${placeholder4}) and status In(${placeholder5}) order by id desc;`;
      const queryValues2 = [
        ...alertsName,
        ...camerasName,
        ...zonesName,
        ...personName,
        ...statusName,
      ];
      let result1 = connection.query(sqlQuery1, queryValues2);

      let resultAsResponse = result1.concat(result);
      let encryptedResponse = await encryptRequest(resultAsResponse);
      res.status(200).json({ data: encryptedResponse });
    }
  }
};

module.exports.getAlertZoneWise = (req, res) => {
  const { startDate, startTime, endDate, endTime, zone } = req.body;
  const sqlQuery = `SELECT * FROM ${DATABASE}.alerts WHERE date BETWEEN ? AND ? AND (time >= ? and time <= ?) and zone =? order by id desc;`;
  con.query(
    sqlQuery,
    [startDate, endDate, startTime, endTime, zone],
    async (err, result) => {
      if (result?.length > 0) {
        let encryptedResponse = await encryptRequest(result);
        //let decryptedResponse = await decryptRequest(encryptedResponse);
        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: err });
      }
    }
  );
};

module.exports.getLatestAlerts = (req, res) => {
  try {
    const { startDate, startTime, endDate, endTime } = req.body;
    const sqlQuery = `SELECT alert,alert_type,COUNT(*) AS 'count' FROM ${DATABASE}.alerts  where date between ? and ? and  (time >= ? and time <= ?)GROUP BY alert ORDER BY COUNT desc limit 5;`;

    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime],
      async (err, result) => {
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          let decryptedResponse = await decryptRequest(encryptedResponse);
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: `Error Caught :- ${error}` });
  }

};

module.exports.getTopLatestAlerts = (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;
  const sqlQuery = `select date,time,alert,camera,image from ${DATABASE}.alerts where date between ? and ? and (time >= ? and time <= ?) order by id desc limit 20;`;
  con.query(
    sqlQuery,
    [startDate, endDate, startTime, endTime],
    async (err, result) => {
      if (result.length > 0) {
        let encryptedResponse = await encryptRequest(result);
        let decryptedResponse = await decryptRequest(encryptedResponse);
        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: err });
      }
    }
  );
};

// For Comments section

module.exports.comment = (req, res) => {
  const { id, comment, name } = req.body;
  console.log("req,body", req.body);
  let sqlQuery = `UPDATE pispl.alerts
SET comments = '${JSON.stringify(comment)}'
WHERE id = ${id};`;
  con.query(sqlQuery, async (err, result) => {
    if (result) {
      let encryptedResponse = await encryptRequest("Comment Has Been Updated");
      let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

module.exports.commentsList = (req, res) => {
  const { id } = req.body;
  console.log("req,body", req.body);
  let sqlQuery = `select comments from pispl.alerts

WHERE id = ${id};`;
  con.query(sqlQuery, async (err, result) => {
    console.log("result", result);
    if (result.length > 0) {
      let encryptedResponse = await encryptRequest(result);
      let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

const statusclosediff = (statusclose, extractedDate) => {
  let statusCloseValue = new Date(statusclose);
  let storedDate = new Date(extractedDate?.date);
  console.log("Stored Date ", storedDate);
  const differenceInDays = subtractDates(
    new Date(storedDate).toISOString().split("T")[0],
    new Date(statusCloseValue).toISOString().split("T")[0]
  );
  console.log(`The difference in days is: ${differenceInDays}`);
  return {
    days: differenceInDays,
    // hours: differenceInDays.hoursDifference,
    // minutes: differenceInDays.minutesDifference,
  };
};

// Function to subtract two dates in "yyyy-mm-dd" format
function subtractDates(dateString1, dateString2) {
  const date1 = dateString1.split("-")[2];
  const date2 = dateString2.split("-")[2];

  // Calculate the difference in milliseconds
  const timeDifference = Number(date1) - Number(date2);
  console.log(timeDifference);
  // const date1 = new Date(dateString1);
  // const date2 = new Date(dateString2);

  // // Calculate the difference in milliseconds
  // const timeDifference = date1 - date2;

  // Convert the time difference to days
  // let daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  // console.log("Days Difference", daysDifference);
  // // Convert the time difference to hours
  // let hoursDifference = timeDifference / (1000 * 60 * 60);
  // // Convert the time difference to minutes
  // let minutesDifference = timeDifference / (1000 * 60);
  // console.log("Hours diffference ", hoursDifference);
  // if (daysDifference == 1) {
  // 	daysDifference = 0;
  // 	return { daysDifference, hoursDifference, minutesDifference };
  // } else {
  // 	return { daysDifference, hoursDifference, minutesDifference };
  // }
  return timeDifference;
}

//For Status
module.exports.statusClose = (req, res) => {
  const { id, name } = req.body;
  // console.log("req,body", req.body);
  let closedByName = name.charAt(0).toUpperCase() + name.slice(1);
  let sqlQuery1 = `select date,time from pispl.alerts where id=${id}`;
  let result0 = connection.query(sqlQuery1);
  let data0 = result0;

  //Incoming Date and Time Data
  let IncomingDate = new Date().getDate();
  let IncomingHours = new Date().getHours();
  let IncomingMinutes = new Date().getMinutes();

  //Db record Date and Time Data
  let dbDate = new Date(data0[0].date).getDate();
  let dbTimeHour = Number(data0[0].time.split(":")[0]);
  let dbTimeMinutes = Number(data0[0].time.split(":")[1]);

  // console.log(
  //   "Db record Date and Time Data ----> ",
  //   data0[0].date,
  //   data0[0].time,
  //   dbDate,
  //   dbTimeHour,
  //   dbTimeMinutes
  // );
  // console.log(
  //   "Incoming Date and Time Data -----> ",
  //   IncomingDate,
  //   IncomingHours,
  //   IncomingMinutes
  // );

  //Difference of Date and Time of both
  let dateDifference = dbDate - IncomingDate;
  let hoursDifference = dbTimeHour - IncomingHours;
  let minutesDifference = dbTimeMinutes - IncomingMinutes;

  if (dateDifference < 0) {
    dateDifference = -1 * dateDifference;
  }
  if (hoursDifference < 0) {
    hoursDifference = -1 * hoursDifference;
  }
  if (minutesDifference < 0) {
    minutesDifference = -1 * minutesDifference;
  }

  let diffTimeString = `${dateDifference} Days ${hoursDifference} hours ${minutesDifference} minutes`;

  // console.log(`Diff Time String: ${diffTimeString}`);
  let date = new Date();
  let statusCloseOnValue =
    date.toLocaleDateString() +
    " " +
    date.toTimeString().split(" ")[0].split(" ")[0];

  let sqlQuery = `UPDATE pispl.alerts
  SET status = 'Close', statusclosedby='${closedByName}' , statuscloseon='${statusCloseOnValue}',alertClosureDiffTime='${diffTimeString}' where id=${id};`;
  con.query(sqlQuery, async (err, result) => {
    if (result) {
      let encryptedResponse = await encryptRequest("Status Has Been Updated");
      let decryptedResponse = await decryptRequest(encryptedResponse);
      console.log("STATUS AFTER CLOSE IS ", decryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

//For Bulk close
//For Status
module.exports.bulkStatusClose = (req, res) => {
  const { ids, name } = req.body;
  // console.log("req,body", req.body);
  let closedByName = name.charAt(0).toUpperCase() + name.slice(1);
  let sqlQuery1 = `select date,time from pispl.alerts where id in (${ids})`;
  let result0 = connection.query(sqlQuery1);
  let data0 = result0;

  //Incoming Date and Time Data
  let IncomingDate = new Date().getDate();
  let IncomingHours = new Date().getHours();
  let IncomingMinutes = new Date().getMinutes();

  //Db record Date and Time Data
  let dbDate = new Date(data0[0].date).getDate();
  let dbTimeHour = Number(data0[0].time.split(":")[0]);
  let dbTimeMinutes = Number(data0[0].time.split(":")[1]);

  // console.log(
  //   "Db record Date and Time Data ----> ",
  //   data0[0].date,
  //   data0[0].time,
  //   dbDate,
  //   dbTimeHour,
  //   dbTimeMinutes
  // );
  // console.log(
  //   "Incoming Date and Time Data -----> ",
  //   IncomingDate,
  //   IncomingHours,
  //   IncomingMinutes
  // );

  //Difference of Date and Time of both
  let dateDifference = dbDate - IncomingDate;
  let hoursDifference = dbTimeHour - IncomingHours;
  let minutesDifference = dbTimeMinutes - IncomingMinutes;

  if (dateDifference < 0) {
    dateDifference = -1 * dateDifference;
  }
  if (hoursDifference < 0) {
    hoursDifference = -1 * hoursDifference;
  }
  if (minutesDifference < 0) {
    minutesDifference = -1 * minutesDifference;
  }

  let diffTimeString = `${dateDifference} Days ${hoursDifference} hours ${minutesDifference} minutes`;

  // console.log(`Diff Time String: ${diffTimeString}`);
  let date = new Date();
  let statusCloseOnValue =
    date.toLocaleDateString() +
    " " +
    date.toTimeString().split(" ")[0].split(" ")[0];

  let sqlQuery = `UPDATE pispl.alerts
  SET status = 'Close', statusclosedby='${closedByName}' , statuscloseon='${statusCloseOnValue}', alertClosureDiffTime='${diffTimeString}'
  WHERE id IN  (?);`;
  con.query(sqlQuery, [ids], async (err, result) => {
    if (result) {
      let encryptedResponse = await encryptRequest("Status Has Been Updated");
      let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

//For Bulk Close Status Comments
module.exports.bulkCloseComment = (req, res) => {
  const { ids, comment, name } = req.body;
  console.log("Ids ---> ", req.body);
  let sqlQuery1 = `select date,time from pispl.alerts where id in (${ids})`;
  let result0 = connection.query(sqlQuery1);
  let data0 = result0;

  //Incoming Date and Time Data
  let IncomingDate = new Date().getDate();
  let IncomingHours = new Date().getHours();
  let IncomingMinutes = new Date().getMinutes();

  //Db record Date and Time Data
  let dbDate = new Date(data0[0].date).getDate();
  let dbTimeHour = Number(data0[0].time.split(":")[0]);
  let dbTimeMinutes = Number(data0[0].time.split(":")[1]);

  //Difference of Date and Time of both
  let dateDifference = dbDate - IncomingDate;
  let hoursDifference = dbTimeHour - IncomingHours;
  let minutesDifference = dbTimeMinutes - IncomingMinutes;

  // console.log(
  //   "Db record Date and Time Data ----> ",
  //   data0[0].date,
  //   data0[0].time,
  //   dbDate,
  //   dbTimeHour,
  //   dbTimeMinutes
  // );
  // console.log(
  //   "Incoming Date and Time Data -----> ",
  //   IncomingDate,
  //   IncomingHours,
  //   IncomingMinutes
  // );

  if (dateDifference < 0) {
    dateDifference = -1 * dateDifference;
  }
  if (hoursDifference < 0) {
    hoursDifference = -1 * hoursDifference;
  }
  if (minutesDifference < 0) {
    minutesDifference = -1 * minutesDifference;
  }

  let diffTimeString = `${dateDifference} Days ${hoursDifference} hours ${minutesDifference} minutes`;
  let date = new Date();
  let statusCloseOnValue =
    date.toLocaleDateString() +
    " " +
    date.toTimeString().split(" ")[0].split(" ")[0];

  // console.log(`Diff Time String: ${diffTimeString}`);

  let sqlQuery = `UPDATE pispl.alerts
  SET bulkclosecomment = '${comment}',status='Close', statusclosedby='${name}' , statuscloseon='${statusCloseOnValue}',alertClosureDiffTime='${diffTimeString}'
  WHERE id in(?);`;
  con.query(sqlQuery, [ids], async (err, result) => {
    if (result) {
      let encryptedResponse = await encryptRequest("Comment Has Been Updated");
      let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

module.exports.getCameraByPassTable = (req, res) => {
	let sqlQuery =
		"select id,camera_name,status,bypass from pispl.camera order by id asc";
	con.query(sqlQuery, async (err, result) => {
		if (result?.length > 0) {
			let encryptedResponse = await encryptRequest(result);
			//let decryptedResponse = await decryptRequest(encryptedResponse);
			res.status(200).json({ data: encryptedResponse });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};

// Function to download the image to a local file
const downloadImage = async (url, localPath) => {
	const response = await axios({
		method: "GET",
		url: url,
		responseType: "stream",
	});

	response.data.pipe(fs.createWriteStream(localPath));

	return new Promise((resolve, reject) => {
		response.data.on("end", () => resolve());
		response.data.on("error", (error) => reject(error));
	});
};

module.exports.generatePdf = async (req, res) => {
	let { tableRecords } = req.body;
	console.log("Table Records ----> ", tableRecords);
	let i;
	let end;
	// init document
	let doc = new PDFDocument({
		margin: 10,
		size: "A4",
		bufferPages: true,
	});
	// save document
	doc.pipe(fs.createWriteStream("./PDF/report.pdf"));
	// doc.addPage();
	// // see the range of buffered pages
	// const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }
	// console
	// for (
	// 	i = range.start, end = range.start + range.count, range.start <= end;
	// 	i < end;
	// 	i++
	// ) {
	// 	doc.switchToPage(i);
	// 	doc.text(`Page ${i + 1} of ${range.count}`);
	// }
	(async function () {
		// table
		// renderer function inside json file
		const tableJson = {
			title: "Alerts Table",
			//subtitle: "Subtitle",
			headers: [
				{ label: "Id", property: "id", width: 70 },
				{ label: "Date", property: "date", width: 70 },
				{ label: "Time", property: "time", width: 70 },
				{ label: "Alert", property: "alert", width: 100 },
				{ label: "Camera", property: "camera", width: 100 },
				{ label: "Zone", property: "zone", width: 70 },
				{ label: "Status", property: "status", width: 70 },
			],
			datas: [
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
				{
					id: 82946,
					date: "2024-01-15",
					time: "14:13:19",
					alert_type: "",
					image:
						"https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/frame_2024-01-15 14:13:19.066032180761.jpg",
					camera: "Pharma Clean Room Dock 4-5",
					alert: "Vehicle Turn Around Time",
					tat: "13 min 31 sec",
					comments: null,
					status: "Close",
					usersAssigned: "Ravipratap Singh",
					statusclosedby: null,
					statuscloseon: null,
					video: "https://assert-ai-bucket.s3.ap-south-1.amazonaws.com/82946.gif",
					bulkclosecomment: null,
					zone: "DI",
					cam: "DI3",
					tatstarttime: "2024-01-15 13:56:48",
					tatendtime: "2024-01-15 14:10:19",
					alertClosureDiffTime: null,
				},
			],
			rows: [
				["id 4", "Date 4", "Time 4", "Alert 4", "Camera 4", "Zone 4", "Status 4"],
			],
			options: {
				width: 300,
			},
		};
		// the magic
		doc.text("PISPL - CCTV Analytics - BGR6", {
			align: "center",
		});
		doc.table(tableJson, {
			prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
			prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
				doc.font("Helvetica").fontSize(8);
			},
		});
		// done!
		doc.end();
	})();
	console.log("Path Join ---> ", path.join(__dirname, "../PDF/report.pdf"));
};


module.exports.getCardAlertsList = (req, res) => {
  const { startDate, startTime, endDate, endTime, cardName } = req.body;
  console.log("req body ----> ", req.body);

  const sqlQuery = `select *  from ${DATABASE}.alerts where date between ? and ? and (time >= ? AND time <= ?) and alert='${cardName}';`;

  con.query(
    sqlQuery,
    [startDate, endDate, startTime, endTime],
    async (err, result) => {
      if (result?.length > 0) {
        let encryptedResponse = await encryptRequest(result);
        let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: "No Data" });
      }
    }
  );
};


module.exports.editVisibility = (req, res) => {
  const { id } = req.body;
  const sqlQuery = `update ${DATABASE}.alerts set visibility='hide' where id=${id};`;

  con.query(sqlQuery, async (err, result) => {
    if (result) {
      res.status(200).json({ data: "Visibility Updated" });
    } else {
      res.status(400).json({ message: "Error caught" });
    }
  });
};