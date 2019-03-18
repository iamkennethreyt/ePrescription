const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//load APIs
const users = require("./routes/api/users");
const patients = require("./routes/api/patients");
const drugs = require("./routes/api/drugs");
const prescriptions = require("./routes/api/prescriptions");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/key").mongoURI;

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to the database"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//use routes
app.use("/api/users", users);
app.use("/api/patients", patients);
app.use("/api/drugs", drugs);
app.use("/api/prescriptions", prescriptions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
