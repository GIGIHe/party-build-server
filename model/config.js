const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/e-home", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we 're connected!");
});
module.exports = db; //导出数据库
