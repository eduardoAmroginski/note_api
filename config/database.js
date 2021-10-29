const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI || "mongodb://localhost/javascriptNote";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });
