const mongoose = require("mongoose");
const comment = new mongoose.Schema({
    
},
{ versionKey: false,
timestamps: { createdAt: "created_at", updatedAt:"updated_at"
}});
module.exports = mongoose.model("comment", comment);//模型名，骨架名