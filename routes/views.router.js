const express = require ('express')

const { Router } = express;

const routerViews = new Router()



routerViews.get('/register',(req,res)=>{
    res.render('register',{})

})
routerViews.get('/login',(req,res)=>{
    res.render('login',{})

})
routerViews.get('/perfil',(req,res)=>{
    console.log(req.session)
    res.render('perfil',{name:req.session.firstname})

})
routerViews.get('/logout',(req,res)=>{
   req.session.destroy(err =>{
   if(err) res.send('failed logout')
   res.redirect('/view/logout')
   })   

})

module.exports = routerViews