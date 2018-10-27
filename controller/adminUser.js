const { Router } = require("express");
const router = Router(); //实例化router
const userModel = require("../model/adminUser"); //引入数据表模型
const auth = require("./auth");
//增加管理员用户登录 验证登录状态是否有效，有效才可以在后台进行admin操作
router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      nickname,
      password,
      img,
      desc,
      address,
      job,
      sex,
      phone,
      age
    } = req.body;

    if (password && password.length >= 5) {
      const data = await userModel.create({
        username,
        nickname,
        password,
        img,
        desc,
        address,
        job,
        sex,
        age,
        phone
      });
      //同一个res对象不能重复调用res.xx,所以出现没有办法设置headers，else的代码没走
      res.json({ code: 200, msg: "增加管理员成功" });
    } else {
      throw "请输入合法的密码";
    }
  } catch (error) {
    res.json({ code: 400, msg: "请输入合法的用户名和密码" });
    next(error);
  }
});
// /admin/adminUser/login
//管理员登录界面
router.post("/login", async (req, res, next) => {
  try {
    //获取用户输入的值
    let { username, password } = req.body;
    //如果用户输入用户名和密码
    if (username && password) {
      const user = await userModel.findOne({ username });
      if (user) {//判断用户是否存在
        if (password == user.password) {
          req.session.user = user; //将用户信息存在session里
          res.json({
            code: 200,
            data: {
              username:user.username,
              nickname: user.nickname,
              img: user.img,
              desc: user.desc,
              address: user.address,
              job: user.job,
              sex: user.sex,
              phone: user.phone,
              age: user.age,
            },
            msg: "用户登录成功"
          });
        } else {
          res.json({
            code: 401,
            msg: "用户密码错误"
          });
        }
      } else {
        res.json({
          code: 401,
          msg: "该用户不存在"
        });
      }
    }
  } catch (error) {
    next(error);
  }
});
// 获取管理员列表
router.get("/user", auth, async  (req, res, next) => {
  try {
    let count = await userModel.count();
    let { page = 1, page_size = 10 } = req.query;
    pn = parseInt(page);
    size = parseInt(page_size);
    let user = await userModel
      .find()
      .skip((pn - 1) * size)
      .limit(size)
      .sort({ _id: -1 })
      .select("-password")
        res.json({
          code: 200,
          data:user,
          count: count
      });
  } catch (error) {
    next(error)
  }
 
});
//获取单个管理员
router.get("/user/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await userModel.findById(id);
    res.json({
      code: 200,
      data,
      msg: "查找成功"
    });
  } catch (error) {
    next(error);
  }
});
// 修改用户信息
router.patch("/user/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nickname, desc, address, job, img, sex, phone, age } = req.body;
    let user = await userModel.findById(id);
    let data = await user.update({
      $set: {
        nickname,
        img,
        desc,
        address,
        job,
        sex,
        phone,
        age
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
// 用户退出登录，退出逻辑，判断用户是否登录，如果登录，清空用户信心，然后退出
router.post("/logout", auth, async (req, res, next) => {
  //首先判断有没有登录
  try {
    req.session.user = null;
    res.json({
      code: 200,
      msg: "退出登录，请重新登录"
    });
  } catch (error) {
    res.json({
      code: 401,
      msg: "用户未登录，请先登录"
    });
    next(error);
  }
});

//删除管理员
router.delete("/user/:id", auth, async (req, res, next) => {
  let id = req.params.id;
  try {
    let user = await userModel.findOneAndRemove(id);
    res.json({
      code: 200,
      user,
      msg: "删除成功"
    });
  } catch (error) {
    next(error);
  }
});
//删除管理员
// router.delete('/del', auth, async (req, res, next) => {
//   let { id } = req.query
//   try {
//     console.log(id)
//     const data = await adminUserData.findByIdAndRemove(id)
//     res.json({
//       code: 200,
//       msg: '删除成功'
//     })
//   } catch (error) {
//     res.json({
//       code: 400,
//       msh: '删除失败'
//     })
//   }
// })


















// router.get("/user", async (req, res, next) => {
//   let { page = 1, page_size = 10 } = req.query;
//   pn = parseInt(page);
//   size = parseInt(page_size);
//   let data = userModel.find()
//   data.skip((pn - 1) * size)
//     .limit(size)
//     .sort({ _id: -1 })
//       res.json({
//         code: 200,
//         data
//       });
// });
module.exports = router;
