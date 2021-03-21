const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUser, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUser(username)
        if (user == null){
            return done(null, false, {message: "Sem usuário com este nome" })
        }

        try{
            if (await bcrypt.compare(password, user.password)){
                return done (null, user)
            } else {
                return done(null, false, {message: "Senha incorreta"})
            }
        } catch (e)  {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id) )
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize