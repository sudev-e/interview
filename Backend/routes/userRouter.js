var router=require('express-router')
const { Register, Login, addTodo, deleteTodo, getTodos } = require('../Controllers/UserController')

router.post('/signup',Register)

router.post('/login',Login)

router.post('/addtodo',addTodo)

router.put('/edittodo',)

router.get('/alltodo',getTodos)

router.delete('/tododelete',deleteTodo)


module.exports=router