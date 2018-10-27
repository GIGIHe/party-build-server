const mongoose = require("mongoose");
const catagory = new mongoose.Schema({
    title:String
},
{ versionKey: false,
timestamps: { createdAt: "created_at", updatedAt:"updated_at"
}});
module.exports = mongoose.model("catagory", catagory);//模型名，骨架名