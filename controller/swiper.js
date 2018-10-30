const { Router } = require("express");
const router = Router(); //实例化router
const auth = require("./auth");
const swiperModel = require("../model/swiper"); //引入数据表模型 //
//添加轮播图
router.post("/", auth, async (req, res, next) => {
  try {
    const { imgUrl, title, newsId, status, sort } = req.body;
    let data = await swiperModel.create({
      imgUrl,
      title,
      newsId,
      status,
      sort
    });
    res.json({
      code: 200,
      data,
      msg: "添加轮播图成功"
    });
  } catch (error) {
    next(error);
  }
});
// 获取轮播图
router.get('/', auth, async (req, res, next) => {
    try {
        let count = await swiperModel.count()
        let {pn = 1,size = 10} = req.query
        pn = parseInt(pn)
        size = parseInt(size)
        let data = await swiperModel.find().skip((pn - 1) * size).limit(size).sort({ sort: -1,_id:-1}).populate({path:'newsId'
    })
        res.json({
            code: 200,
            data,
            count,
            msg: '获取轮播图成功'
        })
    } catch (error) {
        next(error)
    }
})
// 获取符合查询条件的轮播图
router.get("/user", auth, async (req, res, next) => {
  try {
    let swiper = await swiperModel.find({ status: 1 }).populate({
      path: "newsId"
    }); //status为1对用户可见
    res.json({
      code: 200,
      data: swiper,
      msg: "获取轮播图成功"
    });
  } catch (error) {
    next(error);
  }
});
// 获取单个轮播图
router.get("/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;

    let data = await swiperModel.findById(id).populate({ path: "newsId" });

    res.json({
      code: 200,
      data,
      msg: "成功"
    });
  } catch (error) {
    next(error);
  }
});
//编辑轮播图
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    let { imgUrl, title, newsId, status, sort } = req.body;
    let swiper = await swiperModel.findById(id);
    let data = await swiper.update({
      $set: {
        imgUrl,
        title,
        newsId,
        status,
        sort
      }
    });
    res.json({
      code: 200,
      data,
      msg: "修改成功"
    });
  } catch (error) {
    next(error);
  }
});
//删除
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    let data = await swiperModel.findByIdAndRemove(id);
    res.json({
      code: 200,
      data,
      msg: "删除成功"
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
