module.exports = function(req, res, next) {
// 判断依据:用户是否登录
  if (req.session && req.session.user) {
    next();
  } else {
    res.json({
      code: 401,
      msg: "用户状态失效"
    });
  }
};
