const mysql = require("mysql");
const MySql = require("sync-mysql");
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

module.exports.getCount = (req, res) => {
  const { startDate, startTime, endDate, endTime, TabNo } = req.body;
  if (TabNo == 1) {
    const sqlQuery = `select * from ${DATABASE}.alerts where alert_type=? and date between ? and ? and time between ? and ?`;
    const countObject = {
      dockOpenCount: 0,
      dockClosedCount: 0,
      tatCount: 0,
      novehicleatdockCount: 0,
    };
    con.query(
      sqlQuery,
      ["dock", startDate, endDate, startTime, endTime],
      async (err, result) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].alert == "door open") {
            countObject.dockOpenCount += 1;
          } else if (result[i].alert == "door closed") {
            countObject.dockClosedCount += 1;
          } else if (result[i].alert == "tat") {
            countObject.tatCount += 1;
          } else if (result[i].alert == "no vehicle at dock") {
            countObject.novehicleatdockCount += 1;
          }
        }
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(countObject);
          // let decryptedResponse = await decryptRequest(encryptedResponse);// For Debugging purpose
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (TabNo == 2) {
    const sqlQuery = `select * from ${DATABASE}.alerts where alert_type=? and date between ? and ? and time between ? and ?`;
    const countObject = {
      IntrusionCount: 0,
      LoiteringCount: 0,
      CrowdDetectionCount: 0,
      OfficeAreaTimeCount: 0,
      EntryCount: 0,
      ExitCount: 0,
    };
    con.query(
      sqlQuery,
      ["person", startDate, endDate, startTime, endTime],
      async (err, result) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].alert == "Intrusion Detected") {
            countObject.IntrusionCount += 1;
          } else if (result[i].alert == "Crowd Detected") {
            countObject.CrowdDetectionCount += 1;
          } else if (result[i].alert == "Office Area Time Restriction") {
            countObject.OfficeAreaTimeCount += 1;
          } else if (result[i].alert == "Loitering detected") {
            countObject.LoiteringCount += 1;
          } else if (result[i].alert == "Entry") {
            countObject.EntryCount += 1;
          } else {
            countObject.ExitCount += 1;
          }
        }
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(countObject);
          let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
          res
            .status(200)
            .json({ data: encryptedResponse, data1: decryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (TabNo == 3) {
    const sqlQuery = `select * from ${DATABASE}.alerts where alert_type=? and date between ? and ? and time between ? and ?`;
    const countObject = {
      ppe: 0,
      emergencyExitBayCount: 0,
      fireextingguishernotavailable: 0,
    };
    con.query(
      sqlQuery,
      ["security", startDate, endDate, startTime, endTime],
      async (err, result) => {
        console.log("result", result);
        for (let i = 0; i < result.length; i++) {
          if (result[i].alert == "ppe") {
            countObject.ppe += 1;
          } else if (result[i].alert == "emergency Exit Bay Interruption") {
            countObject.emergencyExitBayCount += 1;
          } else {
            countObject.fireextingguishernotavailable += 1;
          }
        }
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(countObject);
          // let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (TabNo == 4) {
    const sqlQuery = `select * from ${DATABASE}.alerts where alert_type=? and date between ? and ? and time between ? and ?`;
    const countObject = {
      noTwoWheelerCount: 0,
      materialLayingOutside: 0,
      personCarryingBoxes: 0,
    };
    con.query(
      sqlQuery,
      ["violations", startDate, endDate, startTime, endTime],
      async (err, result) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].alert == "two wheeler detected") {
            countObject.noTwoWheelerCount += 1;
          } else if (result[i].alert == "material laying outside") {
            countObject.materialLayingOutside += 1;
          } else if (result[i].alert == "person carrying boxes") {
            countObject.personCarryingBoxes += 1;
          }
        }
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(countObject);
          let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
          res.status(200).json({
            data: encryptedResponse,
            data1: JSON.parse(decryptedResponse),
          });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  }
};
module.exports.getList = (req, res) => {
  const { startDate, startTime, endDate, endTime, TabNo, alert } = req.body;
  if (TabNo == 1) {
    const sqlQuery = `select * from ${DATABASE}.alerts where date between ? and ? and time between ? and ? and alert_type=? and alert=?`;
    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime, "dock", alert],
      async (err, result) => {
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          // let decryptedResponse = await decryptRequest(encryptedResponse);// For Debugging purpose
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (TabNo == 2) {
    const sqlQuery = `select * from ${DATABASE}.alerts where date between ? and ? and time between ? and ? and alert_type=? and alert=?`;
    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime, "person", alert],
      async (err, result) => {
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          // let decryptedResponse = await decryptRequest(encryptedResponse);// For Debugging purpose
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (TabNo == 3) {
    const sqlQuery = `select * from ${DATABASE}.alerts where date between ? and ? and time between ? and ? and alert_type=? and alert=?`;
    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime, "security", alert],
      async (err, result) => {
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          // let decryptedResponse = await decryptRequest(encryptedResponse);// For Debugging purpose
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  } else if (TabNo == 4) {
    const sqlQuery = `select * from ${DATABASE}.alerts where date between ? and ? and time between ? and ? and alert_type=? and alert=?`;
    con.query(
      sqlQuery,
      [startDate, endDate, startTime, endTime, "violations", alert],
      async (err, result) => {
        if (result.length > 0) {
          let encryptedResponse = await encryptRequest(result);
          // let decryptedResponse = await decryptRequest(encryptedResponse);// For Debugging purpose
          res.status(200).json({ data: encryptedResponse });
        } else {
          res.status(400).json({ message: err });
        }
      }
    );
  }
};
module.exports.totalAlertCounts = async (req, res) => {
  let sqlQuery = `select max(date) as date,max(time) as time, camera,alert,image from pispl.alerts
group by alert
order by date desc, time desc;`;
  let result = connection.query(sqlQuery);
  let encryptedResponse = await encryptRequest(result);
  let decryptedResponse = await decryptRequest(encryptedResponse);
  res.status(200).json({ data: encryptedResponse });
};

module.exports.barGraphCounts = async (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;
  let sqlQuery1 = `select count(*) as count from pispl.alerts where zone="AR" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery2 = `select count(*) as count from pispl.alerts where zone="BC" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery3 = `select count(*) as count from pispl.alerts where zone="CP" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery4 = `select count(*) as count from pispl.alerts where zone="DI" and alert not in('Vehicle Turn Around Time') and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery5 = `select count(*) as count from pispl.alerts where zone="ER" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery6 = `select count(*) as count from pispl.alerts where zone="GA" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery7 = `select count(*) as count from pispl.alerts where zone="MHEA" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery8 = `select count(*) as count from pispl.alerts where zone="OA" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery9 = `select count(*) as count from pispl.alerts where zone="OE" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery10 = `select count(*) as count from pispl.alerts where zone="PR" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery11 = `select count(*) as count from pispl.alerts where zone="RB" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery12 = `select count(*) as count from pispl.alerts where zone="RF" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery13 = `select count(*) as count from pispl.alerts where zone="SA" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  // let sqlQuery14 = `select count(*) as count from pispl.alerts where zone="UN" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  let sqlQuery15 = `select count(*) as count from pispl.alerts where zone="WE" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' AND time <= '${endTime}');`;
  //	let sqlQuery16 = `select count(*) as count from pispl.alerts where alert_type="dock" and alert="No Vehicle At Dock" and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' OR time <= '${endTime}');`;
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
      //		data16.count,
    ],
  });
  let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
  res.status(200).json({
    data: encryptedResponse,
  });
};

module.exports.lineGraphCountsForAlerts = async (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;
  let sqlQuery0 = `SELECT count(*) as count,usersAssigned, SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) AS Open_Count,
    SUM(CASE WHEN status = 'close' THEN 1 ELSE 0 END) AS Close_Count FROM pispl.alerts where usersAssigned not in("") and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' OR time <= '${endTime}') group by usersAssigned;`;
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

module.exports.lineGraphCountsForTAT = async (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;
  let sqlQuery = `select * from ${DATABASE}.alerts where date between '${startDate}' and '${endDate}' and time between '${startTime}' and '${endTime}' group by tat;`;

  let result0 = connection.query(sqlQuery);

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

  // con.query(
  //   sqlQuery,
  //   [startDate, endDate, startTime, endTime],
  //   async (err, result) => {
  //     if (result?.length > 0) {
  //       // let encryptedResponse = await encryptRequest(result);
  //       // let decryptedResponse = await decryptRequest(encryptedResponse);
  //       // console.log("DECRYPTED RESPONSE IS ", decryptedResponse);
  //       let responseObj = [
  //         // tatArray: [],
  //         // tatTimeArray: [],
  //       ];
  //       result.forEach((item) => {
  //         console.log("Result --->", item);
  //         const startSeconds = parseTime(item.tatstarttime.split(" ")[1]);
  //         const endSeconds = parseTime(item.tatendtime.split(" ")[1]);

  //         let diffSeconds = endSeconds - startSeconds;

  //         // If the difference is negative, it means the end time is on the next day
  //         if (diffSeconds < 0) {
  //           diffSeconds += 24 * 3600; // Add one day in seconds
  //         }

  //         let tatdiff = formatTimeDifference(diffSeconds);
  //         var tatStartTimearray = item.tatstarttime.split(":");
  //         var tatEndTimearray = item.tatendtime.split(":");
  //         var tatStartTimeseconds =
  //           parseInt(tatStartTimearray[0], 10) * 60 * 60 +
  //           parseInt(tatStartTimearray[1], 10) * 60 +
  //           parseInt(tatStartTimearray[2], 10);

  //         var tatEndTimeseconds =
  //           parseInt(tatEndTimearray[0], 10) * 60 * 60 +
  //           parseInt(tatEndTimearray[1], 10) * 60 +
  //           parseInt(tatEndTimearray[2], 10);

  //         let tatdiffseconds = 0;
  //         if (tatStartTimeseconds > tatEndTimeseconds) {
  //           tatdiffseconds = tatStartTimeseconds - tatEndTimeseconds;
  //         } else {
  //           tatdiffseconds = tatEndTimeseconds - tatStartTimeseconds;
  //         }

  //         responseObj.push({
  //           x: item.time,
  //           y: [tatdiffseconds, tatStartTimeseconds, tatStartTimeseconds, 30],
  //           z: [
  //             tatdiff,
  //             item.tatstarttime.split(" ")[1],
  //             item.tatendtime.split(" ")[1],
  //             item.camera,
  //             item.zone,
  //           ],
  //         });
  //       });

  //       // JSON.parse(decryptedResponse).forEach((item) => {
  //       // 	if (item.tat != null) {
  //       // 		let tatData = item.tat.split(" ");
  //       // 		let tatMinutes = Number(tatData[0]);
  //       // 		let tatSeconds = Number((Number(tatData[2]) / 60).toFixed(2));
  //       // 		let clubbedTat = Math.round(tatMinutes + tatSeconds);
  //       // 		let tatstarttime = Number(
  //       // 			Number(item.tatstarttime.split(" ")[1].split(":").join("")) /
  //       // 				(10000).toFixed(2)
  //       // 		);
  //       // 		let tatendtime = Number(
  //       // 			Number(item.tatendtime.split(" ")[1].split(":").join("")) /
  //       // 				(10000).toFixed(4)
  //       // 		);
  //       // 		responseObj.push({
  //       // 			x: item.time,
  //       // 			y: [clubbedTat, tatstarttime, tatendtime, 30],
  //       // 		});
  //       // 		// responseObj.tatArray.push(clubbedTat);
  //       // 		// responseObj.tatTimeArray.push(item.time);
  //       // 	}
  //       // });
  //       // console.log(responseObj);
  //       // let encryptedResponseObj = await encryptRequest(responseObj);
  //       // res.status(200).json({
  //       // 	data: responseObj,
  //       // });
  //       return successResponse(res, "Counts", 200, true, {
  //         data: [responseObj],
  //       });
  //     } else {
  //       res.status(400).json({ message: err });
  //     }
  //   }
  // );
  // if (TabNo == 1) {
  // 	let sqlQuery = `select * from ${DATABASE}.alerts where date between ? and ? and time between ? and ? and alert_type=? and alert=?;`;

  // 	con.query(
  // 		sqlQuery,
  // 		[startDate, endDate, startTime, endTime, "dock", "tat"],
  // 		async (err, result) => {
  // 			if (result.length > 0) {
  // 				let encryptedResponse = await encryptRequest(result);
  // 				let decryptedResponse = await decryptRequest(encryptedResponse);
  // 				console.log("DECRYPTED RESPONSE IS ", decryptedResponse);
  // 				let responseObj = {
  // 					tatArray: [],
  // 					tatTimeArray: [],
  // 				};
  // 				JSON.parse(decryptedResponse).forEach((item) => {
  // 					responseObj.tatArray.push(item.tat);
  // 					responseObj.tatTimeArray.push(item.time);
  // 				});
  // 				let encryptedResponseObj = await encryptRequest(responseObj);
  // 				res.status(200).json({
  // 					data: encryptedResponseObj,
  // 				});
  // 			} else {
  // 				res.status(400).json({ message: err });
  // 			}
  // 		}
  // 	);
  // } else {
  // 	res.status(400).json({ message: "No Data" });
  // }
};

module.exports.barGraphClick = async (req, res) => {
  const { startDate, startTime, endDate, endTime, zone } = req.body;
  let sqlQuery1 = `select id,date,time,camera,image,zone,video,status,usersAssigned,alert,statusclosedby,statuscloseon,bulkclosecomment,tat,tatstarttime,tatendtime,alertClosureDiffTime from pispl.alerts where zone='${zone}' and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' And time <= '${endTime}') order by id desc;`;
  let result1 = connection.query(sqlQuery1);
  let data1 = result1;
  let titlesObject = {
    OE: "Office Entry", //0
    WE: "Work Entry", //1
    CP: "Common Pathway Entry Exit", //2
    DI: "Docking Area Internal", //
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

module.exports.barGraphClickForUsersAssigned = async (req, res) => {
  const { startDate, startTime, endDate, endTime, usersAssigned } = req.body;
  let sqlQuery1 = `select id,date,time,camera,image,zone,video,status,usersAssigned,alert,tat,tatstarttime,tatendtime from pispl.alerts where usersAssigned='${usersAssigned}' and date between '${startDate}' and '${endDate}' and  (time >= '${startTime}' OR time <= '${endTime}') order by id desc;`;
  let result1 = connection.query(sqlQuery1);
  let data1 = result1;

  let title = `Alert Assigned To ${data1[0].usersAssigned}`;
  let encryptedResponse = await encryptRequest({
    data: data1,
    title,
  });
  let decryptedResponse = await decryptRequest(encryptedResponse); // For Debugging purpose
  res.status(200).json({
    data: encryptedResponse,
  });
};
