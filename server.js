if (process.env.NODE_ENV !== 'production'){
    require ('dotenv').config()
}
const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const server = express()

server.use(passport.initialize())
server.use(passport.session())

const routes = require('./routes')

server.use(express.urlencoded({ extended:false}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)
server.use(flash())
server.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: false
}))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.listen(4000, function(){
    console.log('Server is running on port 4000')
} )