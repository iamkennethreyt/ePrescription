const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  license: {
    type: String
  },
  phonenumber: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
