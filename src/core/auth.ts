import session from 'express-session'
import { sequelize } from './sequelize'

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const { SESSION_SECRET } = process.env

// Enable persistent login sessions
global.sessionHandler = session({
    secret: SESSION_SECRET,
    name: 'AG-session',
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
})

function applyMiddleware({ app }) {
    app.use(global.sessionHandler)
}

const auth = { applyMiddleware }

export default auth
