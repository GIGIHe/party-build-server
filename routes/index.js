const express = require('express');
const router = express.Router();
const adminUser = require('../controller/adminUser')
const news = require('../controller/news')
const catagory = require("../controller/catagory");
const swiper = require("../controller/swiper");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/admin/adminUser',adminUser)
router.use('/admin/news',news)
router.use("/admin/catagory", catagory);
router.use("/admin/swiper", swiper);
module.exports = router;
