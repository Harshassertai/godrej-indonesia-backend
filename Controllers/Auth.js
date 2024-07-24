const axios = require("axios");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const { decryptRequest, encryptRequest } = require("../utils/crypt");
const User = require("../models/UsersModel");
const LocationModel = require("../models/LocationModel");
const { sendmailusingnodemailer } = require("../utils/sendMail");
const { successResponse, errorResponse } = require("../utils/Response");
require("dotenv").config();
const { JWTKEY } = process.env;

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, locationIds, userType } = req.body;
    let passwordRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    if (passwordRegex.test(password)) {
      let alreadyRegisteredUser = await User.find({ email });
      if (alreadyRegisteredUser.length > 0) {
        res.status(409).json({
          message: `User with ${email} is already present.`,
        });
      } else {
        // Validate location IDs
        const validLocationIds = await LocationModel.find({
          _id: { $in: locationIds },
        }).select("_id");
        if (validLocationIds.length !== locationIds.length) {
          return res.status(400).json({
            message: "Some location IDs are invalid",
          });
        }
        let hasedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          name,
          email,
          password: hasedPassword,
          locationAccess: locationIds,
          userType,
        });
        await newUser.save();
        let encryptedData = await encryptRequest({ data: newUser });
        res.status(201).json({
          message: "User created successfully",
          user: encryptedData,
        });
      }
    } else {
      res.status(400).json({
        message:
          "Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error Caught in Signup :- ${error}`,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let passwordRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    if (passwordRegex.test(password)) {
      let data = await User.find({ email: email });
      if (data.length > 0) {
        let passwordMatch = await bcrypt.compare(password, data[0].password);
        if (passwordMatch) {
          let locations = await LocationModel.find({
            _id: { $in: data[0].locationAccess },
          });
          let loginData = {};
          loginData._id = data[0].id;
          loginData.name = data[0].name;
          loginData.email = data[0].email;
          loginData.userType = data[0].userType;
          loginData.locations = locations;
          loginData.status = data[0].status;
          let encryptedData = await encryptRequest({ data: loginData });
          const token = jwt.sign(
            {
              encryptedData,
            },
            JWTKEY,
            { expiresIn: "1h" }
          );
          return successResponse(res, "Login Successful", 200, true, {
            data: token,
          });
        } else {
          return errorResponse(res, "Unauthourized.", 404, false, null);
        }
      } else {
        return errorResponse(
          res,
          `User with ${email} is not found.`,
          404,
          false,
          null
        );
      }
    } else {
      return errorResponse(
        res,
        `Password must be 8 character long or more and has one Uppercase,One LowerCase,One Digit and a special Character.`,
        404,
        false,
        null
      );
    }
  } catch (error) {
    res.status(500).json({
      message: `Error Caught in Login :- ${error}`,
    });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userDetails = await User.find({ email });
    if (userDetails.length > 0) {
      let token = jwt.sign({ id: userDetails[0]?._id }, JWTKEY, {
        expiresIn: 60 * 10,
      });
      let mailResponse = await sendmailusingnodemailer({ email, token });
      res.status(200).json({ data: mailResponse.response });
    } else {
      res
        .status(404)
        .json({ data: `User with following email ${email} is not found.` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error Caught in Login :- ${error}`,
    });
  }
};


