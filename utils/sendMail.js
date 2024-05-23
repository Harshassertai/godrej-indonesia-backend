let nodemailer = require("nodemailer");

const getHtml = (to, description, ticketNumber) => {
	return (
		`A query has been raised by user with email ${to} ` +
		"<br>" +
		"<br>" +
		"<table style='border: 1px solid white; border-collapse: collapse;'>" +
		"<thead style='border: 1px solid white;  border-collapse: collapse;'>" +
		"<th style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'> Description </th>" +
		"<th style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'> Ticket Number </th>" +
		"</thead>" +
		"<tr>" +
		"<td style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'>" +
		description +
		"</td>" +
		"<td style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'>" +
		ticketNumber +
		"</td>" +
		"</tr>" +
		"</table>"
	);
};
const getHtmlWithCamera = (to, description, ticketNumber, camera) => {
	return (
		`A query has been raised by user with email ${to} ` +
		"<br>" +
		"<br>" +
		"<table style='border: 1px solid white; border-collapse: collapse;'>" +
		"<thead style='border: 1px solid white;  border-collapse: collapse;'>" +
		"<th style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'> Description </th>" +
		"<th style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'> Ticket Number </th>" +
		"<th style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'> Camera </th>" +
		"</thead>" +
		"<tr>" +
		"<td style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'>" +
		description +
		"</td>" +
		"<td style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'>" +
		ticketNumber +
		"</td>" +
		"<td style='border: 1px solid white;  border-collapse: collapse; background-color: #96D4D4;'>" +
		JSON.stringify(
			camera?.map((item) => {
				return item.label;
			})
		) +
		"</td>" +
		"</tr>" +
		"</table>"
	);
};

const sendmailusingnodemailer = ({
	from,
	to,
	description,
	ticketNumber,
	camera,
}) => {
	const transport = nodemailer.createTransport({
    service: "gmail", // use your email provider
    auth: {
      user: "alpha@assertai.com", // your email
      pass: "afsbiztaopvmcouo", // your password
    },
  });

  // Set up email data
  const mailOptions = {
    from: "alpha@assertai.com",
    to: to,
    cc: [
      "support@assertai.com",
      "bhagyashree.joshi@assertai.com",
      "arpit.bhatiya@assertai.com",
      "dinesh.maharana@assertai.com",
    ],
    subject: `Query For Alert. Ticket Number [${ticketNumber}]`,
    html: camera
      ? getHtmlWithCamera(to, description, ticketNumber, camera)
      : getHtml(to, description, ticketNumber),
  };
	// Send the email
	transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log("Email sent: " + info.response);
		}
		// Close the transporter
		transport.close();
	});

	// await transport.sendMail({
	// 	from: from,
	// 	to: to,
	// 	// cc: cc,
	// 	// bcc: "nimeshkumar.dabhi@siemens.com",
	// 	subject: "Query For Alert",
	// 	html: getHtml(from, description),
	// });
};

module.exports = { sendmailusingnodemailer };
