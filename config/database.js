const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDb successfully connected");
    })
    .catch((err) => {
      console.log("Error occured in connecting to database. ", err);
      process.exit(1);
    });
};

module.exports = connect;
