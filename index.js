const express = require ('express')
const session =require('express-session');
const FileStore = require('session-file-store')(session);
const MongoStore = require ('connect-mongo');
const handlebars = require ('express-handlebars');
const routerViews = require ('./routes/views.router')
const routerAuth = require('./routes/auth.router')

const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://sebastianramirezpain:peperoni1234@cluster0.x6tvpmi.mongodb.net/avanzado2'
    }),
    secret:'secretCoder',
    resave:true,
    saveUninitialized: true
}))
//views config

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')


app.use('/view', routerViews)
app.use('/auth', routerAuth)


app.get('/setSession',(req,res)=>{
    req.session.mensaje = 'Hola soy una session'
    req.session.test= true

    res.send('Session created')
})
app.get('/getSession',(req,res)=>{
res.send(req.session.mensaje)
})
app.get('/logout',(req,res)=>{
req.session.destroy(err =>{
    if(err) res.send('Failed Logout')
    res.send('logout ok')
})
})

app.listen(8080,()=>{
    console.log('Server OK');
})