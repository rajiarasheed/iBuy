require('dotenv').config()
const express =require('express')
const http= require('http')
const config= require('./config/config')
const logger = require('./utils/logger')
const dbConnection = require('./config/database')
const { setupMiddleware } = require('./middlewares/setup')
const { errorHandler, notFound } = require('./middlewares/errorHandler')
const { setupRoutes } = require('./routes')

class Server{
    constructor(){
        this.app=express()
        this.server=http.createServer(this.app)
        this.port=config.PORT
       
       
        // ✅ Test route
        this.app.get('/', (req, res) => {
            res.send('API is running...')
        })
    }

    async initialize(){
        try {
            await dbConnection.connect();

            setupMiddleware(this.app) 
            setupRoutes(this.app)

            this.app.use(errorHandler);
            this.app.use(notFound)

            logger.info('Server Initialization Successful')
        } catch (error) {
            logger.error('Server initialization failed: ',error);
            process.exit(1)
        }
    }
    async start(){
        await this.initialize();
        this.server.listen(this.port,async()=>{
            logger.info(`server is running on ${this.port}...`);
            
        })
    }
}

const appServer = new Server();
appServer.start();

module.exports = appServer.app