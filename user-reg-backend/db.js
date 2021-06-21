const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Successfull");
    } else {
      console.log(
        "Error in MongoDb Connection : " + JSON.stringify(err, undefined, 2)
      );
    }
  }
);
require("./models/user.model");
