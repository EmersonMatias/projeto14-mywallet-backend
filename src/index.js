import express from "express"
import cors from "cors"
import usersRouters from "./routers/usersRouters.js"
import dataUsersRouters from "./routers/dataUsersRouters.js"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//MONGODB
const mongoClient = new MongoClient(process.env.MONGO_URL)

try{
    await mongoClient.connect()
    console.log("MongoDB Conectado") 
} catch(error){
    console.log(error)
}

export let db = mongoClient.db("myWallet")

//ROTAS
app.use(usersRouters)
app.use(dataUsersRouters)

const port = process.env.PORT || 5000 

app.listen(port, () => console.log(`Server running in port: ${port}`)) 