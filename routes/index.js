const express = require('express');
const router = express.Router();
const adminUser = require('../controller/adminUser')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/admin/adminUser',adminUser)
module.exports = router;
