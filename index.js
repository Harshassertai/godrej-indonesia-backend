const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
app.use(mainRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log("There is error in running the server!!");
  }
  console.log(`Server is running at port :- ${PORT}`);
});
