const mysql = require("mysql");
const MySql = require("sync-mysql");
const moment = require("moment");
const { encryptRequest, decryptRequest } = require("../utils/crypt");
const { successResponse, errorResponse } = require("../utils/Response");
const { HOST, USER, PASSWORD, DATABASE } = process.env;
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

module.exports.getlast24hrsEntryCount = (req, res) => {
  const sqlQuery = `select count(*) as entry_count from ${DATABASE}.alerts where date >= now() - interval 1 day and alert='Entry';`;

  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      console.log("");
      let encryptedResponse = await encryptRequest(result[0].entry_count);
      let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  });
};

module.exports.getlast24hrsExitCount = (req, res) => {
  const sqlQuery = `select count(*) as exit_count from ${DATABASE}.alerts where date >= now() - interval 1 day and alert='Exit';`;

  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      let encryptedResponse = await encryptRequest(result[0].exit_count);
      let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  });
};
module.exports.getlast24hrsTatCount = (req, res) => {
  const sqlQuery = `select count(*) as tat_count from ${DATABASE}.alerts where date >= now() - interval 1 day and alert='Vehicle Turn Around Time';`;

  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      let encryptedResponse = await encryptRequest(result[0].tat_count);
      let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose

      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  });
};

module.exports.getlast24hrsTotalCount = (req, res) => {
  const { TabNo } = req.body;

  if (TabNo == undefined) {
    const sqlQuery = `select count(*) as count from ${DATABASE}.alerts where date >= now() - interval 1 day and alert NOT IN ('Vehicle Turn Around Time');`;

    con.query(sqlQuery, async (err, result) => {
      if (result?.length > 0) {
        let encryptedResponse = await encryptRequest(result[0].count);
        let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: "No Data" });
      }
    });
  } else {
    const sqlQuery = `select count(*) as count from ${DATABASE}.alerts where date >= now() - interval 1 day and zone='${TabNo}'`;

    con.query(sqlQuery, async (err, result) => {
      if (result?.length > 0) {
        let encryptedResponse = await encryptRequest(result[0].count);
        let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
        res.status(200).json({ data: encryptedResponse });
      } else {
        res.status(400).json({ message: "No Data" });
      }
    });
  }
};

module.exports.get24hrsCardAlertsList = (req, res) => {
  let { cardName } = req.body;
  const sqlQuery = `SELECT * FROM ${DATABASE}.alerts where date >= now() - interval 1 day and alert='${cardName}' order by time desc;`;

  con.query(sqlQuery, async (err, result) => {
    if (result.length > 0) {
      let encryptedResponse = await encryptRequest(result);
      // let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};


module.exports.getlast24hrsAlertList = (req, res) => {
  const sqlQuery = `SELECT * FROM ${DATABASE}.alerts where date >= now() - interval 1 day order by time desc;`;

  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      let encryptedResponse = await encryptRequest(result);
      // let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

module.exports.get24hrsLatestAlerts = (req, res) => {
  const sqlQuery = `SELECT alert,alert_type,COUNT(*) AS 'count' FROM ${DATABASE}.alerts  where date >= now() - interval 1 day GROUP BY alert ORDER BY COUNT DESC limit 5;`;
  con.query(sqlQuery, async (err, result) => {
    if (result?.length > 0) {
      let encryptedResponse = await encryptRequest(result);
      // let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};
module.exports.get24hrsTopLatestAlerts = (req, res) => {
  const sqlQuery = `select date,time,alert,camera,image from ${DATABASE}.alerts where date >= now() - interval 1 day order by id desc limit 20;`;
  con.query(sqlQuery, async (err, result) => {
    if (result.length > 0) {
      let encryptedResponse = await encryptRequest(result);
      // let decryptedResponse = await decryptRequest(encryptedResponse);
      res.status(200).json({ data: encryptedResponse });
    } else {
      res.status(400).json({ message: err });
    }
  });
};

module.exports.barGraphCountsfor24hrs = async (req, res) => {
  let sqlQuery1 = `select count(*) as count from pispl.alerts where zone="AR" and date >= now() - interval 1 day;`;
  let sqlQuery2 = `select count(*) as count from pispl.alerts where zone="BC" and date >= now() - interval 1 day;`;
  let sqlQuery3 = `select count(*) as count from pispl.alerts where zone="CP"  and date >= now() - interval 1 day;`;
  let sqlQuery4 = `select count(*) as count from pispl.alerts where zone="DI" and alert not in('Vehicle Turn Around Time')  and date >= now() - interval 1 day;`;
  let sqlQuery5 = `select count(*) as count from pispl.alerts where zone="ER"  and date >= now() - interval 1 day;`;
  let sqlQuery6 = `select count(*) as count from pispl.alerts where zone="GA"  and date >= now() - interval 1 day;`;
  let sqlQuery7 = `select count(*) as count from pispl.alerts where zone="MHEA"  and date >= now() - interval 1 day;`;
  let sqlQuery8 = `select count(*) as count from pispl.alerts where zone="OA" and date >= now() - interval 1 day;`;
  let sqlQuery9 = `select count(*) as count from pispl.alerts where zone="OE"  and date >= now() - interval 1 day;`;
  let sqlQuery10 = `select count(*) as count from pispl.alerts where zone="PR" and date >= now() - interval 1 day;`;
  let sqlQuery11 = `select count(*) as count from pispl.alerts where zone="RB"  and date >= now() - interval 1 day;`;
  let sqlQuery12 = `select count(*) as count from pispl.alerts where zone="RF"  and date >= now() - interval 1 day;`;
  let sqlQuery13 = `select count(*) as count from pispl.alerts where zone="SA"  and date >= now() - interval 1 day;`;
  // let sqlQuery14 = `select count(*) as count from pispl.alerts where zone="UN" and date >= now() - interval 1 day;`;
  let sqlQuery15 = `select count(*) as count from pispl.alerts where zone="WE"  and date >= now() - interval 1 day;`;
  //let sqlQuery16 = `select count(*) as count from pispl.alerts where zone="WE"  and date >= now() - interval 1 day;`;
  // let sqlQuery18 = `select count(*) as count from pispl.alerts where alert_type="person" and alert="Intrusion detected";`;
  let result1 = connection.query(sqlQuery1);
  let result2 = connection.query(sqlQuery2);
  let result3 = connection.query(sqlQuery3);
  let result4 = connection.query(sqlQuery4);
  let result5 = connection.query(sqlQuery5);
  let result6 = connection.query(sqlQuery6);
  let result7 = connection.query(sqlQuery7);
  let result8 = connection.query(sqlQuery8);
  let result9 = connection.query(sqlQuery9);
  let result10 = connection.query(sqlQuery10);
  let result11 = connection.query(sqlQuery11);
  let result12 = connection.query(sqlQuery12);
  let result13 = connection.query(sqlQuery13);
  // let result14 = connection.query(sqlQuery14);
  let result15 = connection.query(sqlQuery15);
  //	let result16 = connection.query(sqlQuery16);
  let data1 = result1[0];
  let data2 = result2[0];
  let data3 = result3[0];
  let data4 = result4[0];
  let data5 = result5[0];
  let data6 = result6[0];
  let data7 = result7[0];
  let data8 = result8[0];
  let data9 = result9[0];
  let data10 = result10[0];
  let data11 = result11[0];
  let data12 = result12[0];
  let data13 = result13[0];
  // let data14 = result14[0];
  let data15 = result15[0];
  //let data16 = result16[0];
  let encryptedResponse = await encryptRequest({
    data: [
      data1.count,
      data2.count,
      0,
      data4.count,
      data5.count,
      data6.count,
      data7.count,
      data8.count,
      0,
      data10.count,
      data11.count,
      data12.count,
      data13.count,
      // data14.count,
      0,
      //data16.count,
    ],
  });
  let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
  // console.log("DECR ", JSON.parse(decryptedResponse));
  res.status(200).json({
    data: encryptedResponse,
  });
};

module.exports.lineGraphCountsfor24hrs = async (req, res) => {
  let sqlQuery0 = `SELECT count(*) as count,usersAssigned, SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) AS Open_Count,
    SUM(CASE WHEN status = 'close' THEN 1 ELSE 0 END) AS Close_Count FROM pispl.alerts where usersAssigned not in("") and date >= now() - interval 1 day  group by usersAssigned;`;
  let result0 = connection.query(sqlQuery0);

  let data0 = result0;

  if (data0?.length > 0) {
    let countsData = data0.map((item) => {
      return item.count;
    });
    let openCountsData = data0.map((item) => {
      return item.Open_Count;
    });
    let closeCountsData = data0.map((item) => {
      return item.Close_Count;
    });
    let categories = data0.map((item) => {
      return item.usersAssigned;
    });

    return successResponse(res, "Counts", 200, true, {
      data: [countsData, openCountsData, closeCountsData, categories],
    });
  } else {
    return errorResponse(res, "Counts", 404, false, "Not Found");
  }
};

function parseTime(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  // Convert the time to seconds
  return hours * 3600 + minutes * 60 + seconds;
}

function formatTimeDifference(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Pad the numbers to ensure two digits are always shown
  return [hours, minutes, seconds]
    .map((val) => String(val).padStart(2, "0"))
    .join(":");
}

module.exports.lineGraphCountsfor24hrsfortat = async (req, res) => {
  let sqlQuery0 = `select * from pispl.alerts where date >= now() - interval 1 day;`;

  let result0 = connection.query(sqlQuery0);

  let data0 = result0;

  if (data0?.length > 0) {
    let responseObj = [
      // tatArray: [],
      // tatTimeArray: [],
    ];
    data0.forEach((item) => {
      if (item.tat != null) {
        let tatData = item.tat.split(" ");
        const startSeconds = parseTime(item.tatstarttime.split(" ")[1]);
        const endSeconds = parseTime(item.tatendtime.split(" ")[1]);

        let diffSeconds = endSeconds - startSeconds;

        // If the difference is negative, it means the end time is on the next day
        if (diffSeconds < 0) {
          diffSeconds += 24 * 3600; // Add one day in seconds
        }

        let tatdiff = formatTimeDifference(diffSeconds);

        let openValue = Number(
          tatdiff.split(":")[1] * 60 + tatdiff.split(":")[2]
        );
        // console.log(Math.round(openValue / 6000));

        let o = Math.round(openValue / 6000);
        let h = o + 1;
        let l = o - 1;
        let c = 10;

        responseObj.push({
          x: item.time,
          y: [o, h, l, c],
          z: [
            tatdiff,
            item.tatstarttime.split(" ")[1],
            item.tatendtime.split(" ")[1],
            item.camera,
            item.zone,
          ],
        });
      }
    });
    return successResponse(res, "Counts", 200, true, {
      data: [responseObj],
    });
  } else {
    return errorResponse(res, "Counts", 404, false, "Not Found");
  }
};

//Bar Graph bar clickable controller
module.exports.barClickDatafor24hrs = async (req, res) => {
  const { dataPoint } = req.body;

  switch (dataPoint) {
    case 0:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="OE" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 1:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="WE" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      console.log("DATA is ", data);
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 2:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="CP" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 3:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="DI" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 4:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="DE" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 5:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="AR" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 6:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="PR" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 7:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="GA" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 8:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="ER" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 9:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="RB" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 10:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="RF" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 11:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="SA" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 12:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="BC" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 13:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="MHEA" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    case 14:
      var sqlQuery = `select date,time,image,camera from pispl.alerts where zone="QA" and date >= now() - interval 1 day;`;
      var result = connection.query(sqlQuery);
      var data = result;
      var encryptedResponse = await encryptRequest({
        data,
      });
      //var decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
      res.status(200).json({
        data: encryptedResponse,
      });

      break;
    default:
  }
};

module.exports.barGraphClickFor24hrs = async (req, res) => {
  const { zone } = req.body;
  let sqlQuery1 = `select id,date,time,camera,image,zone,video,status,usersAssigned,alert,statusclosedby,statuscloseon,bulkclosecomment,tat,tatstarttime,tatendtime,alertClosureDiffTime from pispl.alerts where zone='${zone}' and date >= now() - interval 1 day order by id desc;`;
  let result1 = connection.query(sqlQuery1);
  let data1 = result1;
  let titlesObject = {
    OE: "Office Entry", //0
    WE: "Work Entry", //1
    CP: "Common Pathway Entry Exit", //2
    DI: "Docking Area Internal", //3
    AR: "Ante Room", //5
    PR: "Pump Room", //6
    GA: "Generator Area", //7
    ER: "Electric Room", //8
    RB: "Road Backside", //9
    RF: "Road Frontside", //10
    SA: "Staging Area", //11
    BC: "Battery Charging Area", //12
    MHEA: "Material Handling", //13
    OA: "Office Area", //14
  };
  let title = "";
  for (const key in titlesObject) {
    if (key == zone) {
      title = titlesObject[key];
    }
  }

  let encryptedResponse = await encryptRequest({
    data: data1,
    title,
  });
  let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
  res.status(200).json({
    data: encryptedResponse,
  });
};

module.exports.barGraphClickFor24hrsForUserAssigned = async (req, res) => {
	console.log("Zone ", req.body);
	const { usersAssigned } = req.body;
	let sqlQuery1 = `select id,date,time,camera,image,zone,video,status,usersAssigned,alert,statusclosedby,statuscloseon,bulkclosecomment,tat,tatstarttime,tatendtime from ${DATABASE}.alerts where usersAssigned='${usersAssigned}' and date >= now() - interval 1 day order by id desc;`;
	let result1 = connection.query(sqlQuery1);
	let data1 = result1;
	let titlesObject = {
		OE: "Office Entry", //0
		WE: "Work Entry", //1
		CP: "Common Pathway Entry Exit", //2
		DI: "Docking Area Internal", //3
		DE: "Docking Area External", //4
		AR: "Ante Room", //5
		PR: "Pump Room", //6
		GA: "Generator Area", //7
		ER: "Electric Room", //8
		RB: "Road Backside", //9
		RF: "Road Frontside", //10
		SA: "Staging Area", //11
		BC: "Battery Charging Area", //12
		MHEA: "Material Handling", //13
		OA: "Office Area", //14
	};
	let title = `Alert Assigned To ${data1[0].usersAssigned}`;
	// for (const key in titlesObject) {
	// 	if (key == zone) {
	// 		title = titlesObject[key];
	// 	}
	// }
	let encryptedResponse = await encryptRequest({
		data: data1,
		title,
	});
	let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
	res.status(200).json({
		data: encryptedResponse,
	});
};
