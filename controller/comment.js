const { Router } = require("express");
const router = Router(); //实例化router
const auth = require("./auth");
const commentModel = require("../model/comment"); //引入数据表模型 //
const topicModel = require("../model/topic"); //引入数据表模型 //
router.get("/", auth, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
// 添加评论
router.post("/", auth, async (req, res, next) => {
  try {
    const { comment, topic_id } = req.body;//
    let user_id = req.session.user._id;
    let topicitem = await topicModel.findById(topic_id); //需要找到对应的主题，然后才能写评论
      if (topicitem) {
      let data = await commentModel.create({
        comment,
        topic: topic_id,
        author: user_id
      });
          await topicitem.update({$push:{comment:data._id}})
    //   await topicModel.save()
      res.json({
        code: 200,
        data,
        msg: "添加评论成功"
      });
    } else {
      res.json({
        code: 400,
        msg: "这条主题不存在"
      });
    }
  } catch (error) {
    next(error);
  }
});
router.get('/:topic_id', auth, async (req, res, next) => {
    try {
        let id = req.params.topic_id;
        let data = await commentModel
          .findOne({topic:id})
          .populate({ path: "author", select: "img nickname" });
        res.json({
            code: 200,
            data:data,
            msg: '成功'
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router;
