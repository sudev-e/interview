var router=require('express-router')
const { AdminLogin } = require('../Controllers/adminController');
const verifyToken = require('../middleware/verifyToken');
 

router.post('/login',AdminLogin)


module.exports=router