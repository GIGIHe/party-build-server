const mongoose = require("mongoose");
const news = new mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user"
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    contentText: {
      type: String
    },
    img: {
      type: String
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "catagory"
    },
    // comment:{
    //     type:Number,
    //     default:1
    // },
    looknumber: {
      type: Number,
      default: 1
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
module.exports = mongoose.model("news", news); //模型名，骨架名
