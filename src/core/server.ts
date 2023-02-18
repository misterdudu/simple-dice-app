import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import url from 'url'
import apollo from './apollo'
import auth from './auth'
import bodyParser from 'body-parser'
import { sequelize } from './sequelize'

const { PORT = 8085 } = process.env

async function startServer(): Promise<void> {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log('Connection has been established successfully.')
    } catch (e) {
        console.error('Unable to connect to the database:', e)
    }

    // Create express app
    const app = express()

    // Always wear a helmet
    app.use(helmet())

    // Parse cookies
    app.use(cookieParser())

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // Enable cors
    app.use(
        cors({
            allowedHeaders: [
                'Allow-Control-Allow-Origin',
                'Access-Control-Allow-Origin',
                'Content-Type',
                'Authorization'
            ],
            credentials: true,
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: true
        })
    )

    // Enable GZIP compression
    app.use(compression())

    auth.applyMiddleware({ app })

    apollo.applyMiddleware({ app })

    const httpServer = createServer(app)
    apollo.installSubscriptionHandlers(httpServer)

    const [apolloUpgradeListener] = httpServer.listeners('upgrade').slice(0)

    httpServer.removeAllListeners('upgrade')

    httpServer.on('upgrade', (req, socket, head) => {
        const pathname = url.parse(req.url).pathname
        if (pathname == '/graphql') apolloUpgradeListener(req, socket, head)
        else socket.destroy()
    })

    // Start the server
    httpServer.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

export default startServer
