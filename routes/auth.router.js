const express = require ('express')

const { Router } = express;

const routerAuth = new Router()

let users = []

routerAuth.get('/all',(req,res)=>{
    res.send(users)
})

routerAuth.post('/register-auth',(req,res)=>{
    let userNew = req.body
    userNew.id = Math.random()
    console.log(userNew)
    users.push(userNew)
    res.redirect('/view/login')

})
routerAuth.post('/login-auth',(req,res)=>{
    let userLogin = req.body
    let userFound = users.find(us =>{
        return us.email == userLogin.email && us.password == userLogin.password
    })
    console.log(userFound)
    if (userFound){
        req.session.email = userLogin.email
        req.session.password = userLogin.password
        req.session.firstname = userFound.firstname

    }
    
    res.redirect('/view/perfil')

})

module.exports = routerAuth