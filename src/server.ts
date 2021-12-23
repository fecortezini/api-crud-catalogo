import express from "express";
import sequelize from "./data/database"
import cors from "cors"
import catalogRouter from "./routes/catalogRoutes";

class Server {
    public server;
    public seq;
    constructor(){
        this.seq = sequelize;
        this.server = express()
        this.server.use(express.json())
        this.server.use(cors())
        this.server.use(express.urlencoded({ extended: true }))
        this.server.use('/uploads', express.static('uploads'))
        this.server.use('/catalog', catalogRouter)
    }
}

export default new Server();