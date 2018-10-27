const { Router } = require("express");
const router = Router(); //实例化router
const newsModel = require("../model/news"); //引入数据表模型 //
const auth = require("./auth");
// 添加一条新闻
router.post("/", auth, async (req, res, next) => {
  try {
    let { title, content, contentText, author, type, img } = req.body;
    let data = await newsModel.create({
      title,
      content,
      contentText,
      author,
      type,
      img
    });
    res.json({
      code: 200,
      data,
      msg: "添加新闻成功"
    });
  } catch (error) {
    next(error);
  }
});
//获取全部新闻
router.get("/", async (req, res, next) => {
  try {
    let { page = 1, page_size = 10 } = req.query,
      pn = parseInt(page);
    size = parseInt(page_size);
    let data = await newsModel
      .find()
      .skip((pn - 1) * size)
      .limit(size)
      .sort({ _id: -1 })
      .populate({ path: "author", select: "-password" })
      .populate({ path: "type" });
    res.json({
      code: 200,
      data,
      msg: "查找成功",
      count: data.length
    });
  } catch (error) {
    next(error);
  }
});
//获取单条新闻
router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await newsModel
      .findById(id)
      .populate({ path: "user", select: "-password" })
      .populate({ path: "catagory" });
    res.json({
      code: 200,
      data,
      msg: "查找成功"
    });
  } catch (error) {
    next(error);
  }
});
//删除新闻
router.delete("/:id", auth, async (req, res, next) => {
  try {
    let id = req.params.id;
    let news = await newsModel.findOneAndRemove(id);
    res.json({
      code: 200,
      msg: "删除成功"
    });
  } catch (error) {
    next(error)
  }

});
module.exports = router;
