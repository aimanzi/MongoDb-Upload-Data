const expess = require("express");
const app = expess();
const mongoos = require("mongoose");
const dotenv = require("dotenv");
dotenv.config("./.env");
const port = process.env.PORT;
const router = require("../EncryptionPostServer-Router/router");
app.use(router);
app.use(expess.json);

app.listen(port, () => {
  console.log(`the server is listen to port http://localhost:${port}`);
});
