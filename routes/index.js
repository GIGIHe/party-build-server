const express = require("express");
const router = express.Router();
const cert = require("../jwt/auth");
const jwt = require("jsonwebtoken");
const adminModel = require("../model/adminUser");
const adminUser = require("../controller/adminUser");
const news = require("../controller/news");
const catagory = require("../controller/catagory");
const swiper = require("../controller/swiper");
const topic = require("../controller/topic");
const comment = require("../controller/comment");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/admin/adminUser", adminUser);
router.use("/admin/news", news);
router.use("/admin/catagory", catagory);
router.use("/admin/swiper", swiper);
router.use("/admin/topic", topic);
router.use("/admin/comment", comment);

//使用jwt验证登录
router.post("/admin/jwt", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      let user = await adminModel.findOne({ username });
      if (user) {
        if (password == user.password) {
          let token = jwt.sign({ user_id: user._id }, cert, {
            expiresIn: 60 * 60 * 2
          });
          // 签名的三个参数分别为：payload,秘钥，options
          //生成的token有三个部分之间以.间隔不换行,headers.payload.signature
          res.json({
            code: 200,
            data: user,
            token,
            msg: "登录成功"
          });
        } else {
          res.json({ code: 403, msg: "密码错误" });
        }
      } else {
        res.json({ code: 403, msg: "该用户不存在" });
      }
    }
  } catch (error) {
    next(error);
  }
});

//不需要验证
router.get("/demo/users1", async (req, res, next) => {
  try {
    let users = await adminModel.find();
    res.json({
      code: 200,
      users,
      msg: "success"
    });
  } catch (error) {
    next(error);
  }
});
//需要验证
router.get("/demo/users2", (req, res) => {
  let token = req.query.token || req.body.token || req.headers.token;
  // console.log(token);
  if (token) {
    jwt.verify(token, cert, function(err, decode) {
      // console.log(err);
      if (err) {
        res.json({ code: 403, msg: "登录状态失效" });
        return;
      }
      console.log(decode);
      adminModel.findOne({ _id: decode.user_id }).then(data => {
        res.json({ code: 200, data, msg: "success" });
      });
    });
  } else {
    res.json({
      code: 401,
      msg: "缺少token"
    });
  }
});
module.exports = router;
