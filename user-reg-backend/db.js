const mongoose = require("mongoose");
const uri =
  "mongodb+srv://aarya8702:ABhishek@1234@meancluster0.niijl.mongodb.net/USER_CRUD?retryWrites=true&w=majority";
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
