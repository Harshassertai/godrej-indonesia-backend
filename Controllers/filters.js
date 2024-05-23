const mysql = require("mysql");
const { HOST, USER, PASSWORD, DATABASE } = process.env;
var con = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	multipleStatements: false,
});

module.exports.getAlertsList = (req, res) => {
	let sqlQuery = "select distinct(alert) from pispl.alerts order by alert asc";
	con.query(sqlQuery, (err, result) => {
		if (result.length > 0) {
			let data = result.map((item) => {
				return {
					label: item.alert,
					value: item.alert,
				};
			});
			res.status(200).send({ data });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};

module.exports.getCamerasList = (req, res) => {
	let sqlQuery = "select distinct(camera) from pispl.alerts order by camera asc";
	let cameras = [];

	con.query(sqlQuery, (err, result) => {
		if (result.length > 0) {
			let data = result.map((item) => {
				return {
					label: item.camera,
					value: item.camera,
				};
			});
			res.status(200).send({ data });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};
module.exports.getByPassCamerasList = (req, res) => {
	let sqlQuery =
		"select id,camera_name,status,bypass from pispl.camera order by camera_name asc";
	con.query(sqlQuery, (err, result) => {
		if (result?.length > 0) {
			let data = result.map((item) => {
				return {
					label: item.camera_name,
					value: item.camera_name,
				};
			});
			res.status(200).send({ data });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};
module.exports.getZonesList = (req, res) => {
	let sqlQuery = "select distinct(zone) from pispl.alerts order by zone asc";
	let cameras = [];

	con.query(sqlQuery, (err, result) => {
		if (result.length > 0) {
			let data = result
				.filter((item) => {
					if (item.zone != null) {
						return item;
					}
				})
				.map((item) => {
					return {
						label: item.zone,
						value: item.zone,
					};
				});
			console.log("ZONE DATA ", data);
			res.status(200).send({ data });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};

module.exports.getUsersAssignedList = (req, res) => {
	let sqlQuery =
		"select distinct(usersAssigned) from pispl.alerts order by usersAssigned asc";
	let cameras = [];

	con.query(sqlQuery, (err, result) => {
		if (result.length > 0) {
			let data = result
				.filter((item) => {
					if (item.usersAssigned != null && item.usersAssigned != "") {
						return {
							label: item.usersAssigned,
							value: item.usersAssigned,
						};
					}
				})
				.map((item) => {
					return {
						label: item.usersAssigned,
						value: item.usersAssigned,
					};
				});

			res.status(200).send({ data });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};
module.exports.getStatusList = (req, res) => {
	let sqlQuery = `select distinct(status) from ${DATABASE}.alerts order by status asc`;
	let cameras = [];

	con.query(sqlQuery, (err, result) => {
		if (result.length > 0) {
			let data = result
				.filter((item) => {
					if (item.status != null && item.status != "") {
						return {
							label: item.status,
							value: item.status,
						};
					}
				})
				.map((item) => {
					return {
						label: item.status,
						value: item.status,
					};
				});

			res.status(200).send({ data });
		} else {
			res.status(400).json({ message: `Error Caught :- ${err}` });
		}
	});
};
