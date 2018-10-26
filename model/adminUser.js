const mongoose = require("mongoose");
const adminUser = new mongoose.Schema(
  {
    // 需要的字段
    username: {
      type: String,
      unique: true,
      required: true
    },
    nickname:{
      type: String,
      default:'helo'
    },
    password: {
      type: String,
      required: true
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      default: "这人很懒啥也没留下"
    },
    address: {
      type: String,
      default: "北京"
    },
    job:String,
    sex: {
      type: String,
      default: 1
    },
    phone: {
      type: String,
      default: "1234567"
    },
    age: {
      type: Number,
      default: 18
    },
  },
    { versionKey: false, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
// 模型
module.exports = mongoose.model("user", adminUser);//集合名,骨架名
// 一个model的实例直接映射为数据库中的一个文档;
