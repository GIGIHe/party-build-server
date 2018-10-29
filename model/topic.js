const mongoose = require("mongoose");
const topic = new mongoose.Schema(
  {
    // commentCount: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "comment"
    // },
    type: {
      //公开与不公开
      type: Number,
      default: 0
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user"
    },
    comment: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "comment"
      }
    ]
  },

  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
module.exports = mongoose.model("topic", topic); //模型名，骨架名
