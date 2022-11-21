import { ObjectId } from "bson"
import { db } from "../index.js"


// INSERIR NOVOS DADOS DO USUARIO
export async function postDataUser(req, res){
    const newData = req.newData

    try{
        //Signup new data
        await db.collection("userData").insertOne(newData)
        res.send("Valor cadastrado")
    } catch(error){
        res.send(error)
    }
}


// PEGAR DADOS DO USUARIO
export async function getDataUser(req, res){
    const userId = req.userId

    try{
        //Take user data
        const dataUser = await db.collection("userData").find({userId: ObjectId(userId)}).toArray()
        res.send(dataUser)
    } catch(error){
       res.send(error)
    }

}
 