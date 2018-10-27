const mongoose = require("mongoose");
const swiper = new mongoose.Schema(  
    {
     imgUrl:{
         type:Stirng,
         required:true,
     },
     title:{
         type: String,
         required:true
     },
     NewsId:{
         type: Object,
         ref:'news',
         require:true
     },
     status:{
         type:Number,
         default:1
     },
     sort:{
         type:Number,
         default:1
     }
    },
{ versionKey: false,timestamps: { createdAt: "created_at", updatedAt:"updated_at"
}});
module.exports = mongoose.model("swiper", swiper);//表名，骨架名