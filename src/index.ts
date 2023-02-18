import 'dotenv/config'
import startServer from './core/server'

// Start the server
startServer()

global.online_users = []

declare global {
    namespace NodeJS {
        interface Global {
            online_users: any[]
            sessionHandler: any
        }
    }
}
