const express = require("express");
const cors = require("cors")
const router = express.Router();
var bodyParser = require('body-parser'); //to reciving data from frontEnd as JSON file
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const encr = require("../handlers/encryption") // import for handlers functions

router.use(cors());
router.get("", encr.mainPage);
router.post("/data", encr.EncryptionData)
router.get("/data", encr.EncryptionData)


module.exports = router;                              // export the router 