const mongoose = require("mongoose");
const comment = new mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user"
    },
    topic: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "topic"
    },
    comment: {
      type: String,
      required: true
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
module.exports = mongoose.model("comment", comment); //模型名，骨架名
