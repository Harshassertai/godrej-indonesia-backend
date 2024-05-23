const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const nocache = require("nocache");
const helmet = require("helmet");
const connectDB = require("./Config/db");
require("dotenv").config();

const { PORT } = process.env;

const mainRoutes = require("./Routes/index");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(helmet());
// app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(nocache());
app.use("*", cors());
// app.use(cors());
app.set("host", "*.*.*.*");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms [:date[clf]]"
  )
);

// creating 1 day from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: process.env.SECRETACCESSKEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(function (req, res, next) {
  if (
    req.method === "POST" ||
    req.method === "GET" ||
    req.method === "PUT" ||
    req.method === "DELETE" ||
    req.method === "PATCH"
  )
    next();
  else res.send(false);
});

app.post("/send_mail", async (req, res) => {
  let { email } = req.body;
  let sqlQuery = `select id from pispl.users where email='${email}' and reset_password_attempts <= 5 and last_reset_password_attempt + INTERVAL 60 MINUTE < now()`;
  let userId;
  con.query(sqlQuery, async function (err, result) {
    if (err) {
      res.status(404).json({ Message: "Error in Sending Mail." });
    } else if (result.length > 0) {
      var expiresTime = new Date();
      expiresTime.setHours(expiresTime.getHours() + 1);
      console.log("Expires Time ", Date.parse(expiresTime));
      userId = result[0].id;
      connection.query(
        `UPDATE pispl.users SET reset_password_attempts = reset_password_attempts + 1 ,last_reset_password_attempt = now() WHERE id = '${userId}'`
      );
      const transport = nodemailer.createTransport({
        service: "gmail",
        // host: process.env.MAIL_HOST,
        // secure: false,
        // port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: `Reset Password Mail.`,
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
        ">
								<p>Click below link to reset your password.</p>
								<a href='https://pispl.app-assertai.com/resetpassword/${userId}/${Date.parse(
          expiresTime
        )}'>Rest Password Link </a>
				   <p>The above link will be expired in one hour.</p>
         </div>
    `,
      });
      res.status(200).json({ Message: "Link is sent to your mail." });
    } else {
      res
        .status(404)
        .json({ Message: "Your Account Has Been Locked for 1 hr." });
    }
  });
});

cron.schedule("*/10 * * * * *", function () {
  connection.query(
    "UPDATE pispl.users set incorrect_password_attempts = 0 where incorrect_password_attempts >= 5 and last_incorrect_login + INTERVAL 15 MINUTE < now();"
  );
  connection.query(
    "UPDATE pispl.users set reset_password_attempts = 0 where reset_password_attempts >= 5 and last_reset_password_attempt + INTERVAL 1440 MINUTE < now();"
  );
});

app.use(mainRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log("There is error in running the server!!");
  }
  console.log(`Server is running at port :- ${PORT}`);
});
