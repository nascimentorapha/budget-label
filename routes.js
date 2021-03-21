if (process.env.NODE_ENV !== 'production'){
    require ('dotenv').config()
}

const express = require('express')
const routes = express.Router()
const data = require('./data.json')
const fs = require('fs')
const controller = require('./controller.js')
const { resolveNaptr } = require('dns')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const server = express()


server.use(passport.session())
server.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: false
}))

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user = user.id === id)
)


const users = []



routes.get("/", function(req, res){
    return res.redirect('/login')
})

routes.get("/login", function(req, res){
    return res.render("login")
})

routes.post("/login", passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}))

routes.get("/register", (req, res) =>{
    return res.render("register")
})

routes.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/login')
    } 
    catch{
        res.redirect('/register')
    }
    console.log(users)

})


routes.get("/admin", function(req, res){
    return res.render("admin/index", { dados: data.dados } )
})

routes.get("/admin/:id", function(req, res){
    const { id } = req.params /* "req.params" é o parametro id na rota */
    const foundData = data.dados.find(function(dado){
        return dado.id == id})

    if (!foundData)
        return res.send("Data not found")

    const dados = {
        ...foundData,
        id:Number(foundData.id)
    }

    return res.render("admin/edit", { dados })

})

routes.put("/admin", function(req, res){
    const { id } = req.body
    console.log(id)
    let index = 0
    const foundData = data.dados.find(function(dado, foundIndex){
        if (id == dado.id){
            index = foundIndex
            return true
        }

    })
    console.log(index)
    if (!foundData) return res.send("Data not found")

    const dados = {
        ...foundData,
        ...req.body,
    }

    data.dados[index] = dados

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err)
            return res.send("Write error")
        
        return res.redirect("/admin")
    })
})

routes.get("/users", controller.calc)
routes.post("/users", controller.post)

routes.get("/result", controller.result)

routes.get("/result/:id", function(req, res){
    const { id } = req.params /* "req.params" é o parametro id na rota */
    const foundCotacao = data.cotacao.find(function(cotacao){
        return cotacao.id == id})
    if (!foundCotacao){
            return res.send("Cotacao not found")
    }
    const cotacao = {
        ...foundCotacao,
        id:Number(foundCotacao.id)
    }

    return res.render("users/result", { cotacao })

})

module.exports = routes