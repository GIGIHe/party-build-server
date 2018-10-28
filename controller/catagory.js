const { Router } = require("express");
const router = Router(); //实例化router
const auth = require("./auth");
const catagoryModel = require("../model/catagory"); //引入数据表模型 //
// 新闻添加分类
router.post("/", auth, async (req, res, next) => {
  try {
    const { title,icon } = req.body;
    let data = await catagoryModel.create({
        title,icon
    });
    res.json({
      code: 200,
      data,
      msg: "添加分类成功"
    });
  } catch (error) {
    next(error);
  }
});
// 获取全部分类
router.get("/", async (req, res, next) => {
  try {
      let data = await catagoryModel.find().sort({_id:1});
    res.json({
      code: 200,
      data,
      msg: "获取分类成功"
    });
  } catch (error) {
    next(error);
  }
});
// 获取单条分类
router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await catagoryModel.findById(id);
    res.json({
      code: 200,
      data,
      msg: "获取分类成功"
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
