const { Router } = require("express");
const router = Router(); //实例化router
const userModel = require("../model/adminUser"); //引入数据表模型
const auth = require("./auth");
//增加管理员用户登录 验证登录状态是否有效，有效才可以在后台进行admin操作
router.post("/", auth, async (req, res, next) => {
  try {
    let {
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
      if (username == user.username) {
        if (password == user.password) {
          req.session.user = user; //将用户信息存在session里
          res.json({
            code: 200,
            data:user,
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
router.get("/user", auth,(req, res, next) => {
    let { page = 1, page_size = 10 } = req.query;
    pn = parseInt(page);
    size = parseInt(page_size);
    let count;
    userModel
      .find()
      .skip((pn - 1) * size)
      .limit(size)
      .sort({_id: -1 })
      .select('-password')
      .then(data=>{
        res.json({
          code: 200,
          data,
          count: data.length
        });
      })
});
//获取单个管理员
router.get('/user/:id',auth, async (req,res,next)=>{
  try {
    let {
      id
    } = req.params
    let data = await userModel.findById(id)
    res.json({
      code: 200,
      data,
      msg: '查找成功'
    })
  } catch (error) {
    next(error)
  }
 
})
// 修改用户信息
router.patch('/user/:id', auth ,async (req,res,next)=>{
  try {
    const {id} = req.params
    const {
      nickname,
      desc,
      address,
      job,
      img,
      sex,
      phone,
      age
    } = req.body
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
      code :200,
      data,
      msg:'修改成功'
    })
  } catch (error) {
    next(error)
  }
  
})

























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
