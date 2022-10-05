const crypto = require("crypto");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config("./.env");
const user = require("../schema/schema");

function mainPage(req, res) {
  console.log("**Home Page**");
  res.end("<h1>Wellcom To Home Page</h1><h1>The Server Is Working</h1>");
}

function EncryptionData(req, res) {
  console.log("**Posting From FrontEnd To Encoding**");
  let mail = req.body.mail;
  let password = req.body.password;

  console.log(mail);
  console.log(password);

  const mailHash = crypto
    .createHash("sha256")
    .update(process.env.KEY + mail)
    .digest("hex");
  const passwordHash = crypto
    .createHash("sha256")
    .update(process.env.KEY + password)
    .digest("hex");

  console.log(mailHash);
  console.log(passwordHash);

  const dataPostHashObj = {
    mailHash,
    passwordHash,
  };

  async function connect() {
    mongoose
      .connect(
        "mongodb+srv://aimanzi:12345@cluster0.dqv6e6r.mongodb.net/test" // url connecting from mongoDb
      
      )
      .then((res) => {
        console.log("connecting to db");
        Uplode(dataPostHashObj);
      })
      .catch((err) => console.log(err));
  }

  async function Uplode(data) {
    user.insertMany(data).then((result) => {
      console.log(result);
    });
  }
  connect();

  res.send("Data Is Uplode TO MongoDB");
}

module.exports = { mainPage, EncryptionData };
