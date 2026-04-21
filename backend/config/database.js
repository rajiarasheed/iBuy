// const { config } = require('dotenv');
const mongoose = require('mongoose')
const config = require('./config')
const logger = require('../utils/logger')

class DatabaseConnection{
    constructor(){
        this.isConnected = false;
    }

    async connect(){
        try {
            if(this.isConnected){
                logger.info('Database already connected');
                return;
                
            }
            const options = {
                
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                family: 4
            }
            await mongoose.connect(config.MONGODB_URI,options);
           
            // MongoDB connection success
            this.isConnected = true;
            logger.info('MongoDB connected successfully');
            
            // MongoDB connection error
            mongoose.connection.on('error',(err)=>{
                logger.error('MongoDB connection error:',err);
                this.isConnected = false;
            })
           
            // MongoDB disconnected
            mongoose.connection.on('disconnected', ()=>{
                logger.warn('MongoDB disconnected')
                this.isConnected = false;
            })

            // MongoDB reconnected
            mongoose.connection.on('reconnected', ()=>{
                logger.info('MongoDB reconnected')
                this.isConnected = true;
            });

        } catch (error) {
            logger.error('MongoDB connection failed',error);
            process.exit(1)
        }
    }

    async disconnect(){
        try {
            await mongoose.connection.close();
            this.isConnected = false;
            logger.info('MongoDB disconnected gracefully')
        } catch (error) {
            logger.error('Error during MongoDB disconnect:',error)
        }
    }

    getConnectionStatus(){
        return{
            isConnected: this.isConnected,
            readyState: mongoose.connection.readyState,
            host: mongoose.connection.host,
            port: mongoose.connection.port,
            name: mongoose.connection.name
        }
    }
}

const dbConnection = new DatabaseConnection();

// Stop your Node app manually
process.on('SIGINT', async()=>{
    await dbConnection.disconnect();
    process.getMaxListeners(0)
})

module.exports = dbConnection;