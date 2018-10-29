const { Router } = require("express");
const router = Router(); //实例化router
const auth = require("./auth");
const topicModel = require("../model/topic"); //引入数据表模型 //
// 添加topic
router.post("/", auth, async (req, res, next) => {
  try {
    const { type, content, contentText } = req.body;
    const user_id = req.session.user._id;
    let data = await topicModel.create({
      type,
      contentText,
      content,
      author: user_id
    });
    res.json({
      code: 200,
      data,
      msg: "发布成功"
    });
  } catch (error) {
    next(error);
  }
});
//获取所有的主题
router.get("/", async (req, res, next) => {
  try {
    let data = await topicModel
      .find()
      .sort({ _id: -1 })
      .populate({ path: "author", select: "img nickname" });
    res.json({
      code: 200,
      data,
      msg: "获取成功"
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
