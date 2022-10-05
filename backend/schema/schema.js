const mongoos = require("mongoose");

const UsersSchema = new mongoos.Schema(
  {
    mailHash: {
      type: String,
      require: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoos.model("Users", UsersSchema);
