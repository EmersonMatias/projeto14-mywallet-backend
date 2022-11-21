import express from "express"
import cors from "cors"
import usersRouters from "./routers/usersRouters.js"
import dataUsersRouters from "./routers/dataUsersRouters.js"
import { MongoClient } from "mongodb"

const app = express()
app.use(cors())
app.use(express.json())

//MONGODB
const mongoClient = new MongoClient("mongodb://localhost:27017")

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

app.listen(5000, () => console.log("Servidor Ligado")) 