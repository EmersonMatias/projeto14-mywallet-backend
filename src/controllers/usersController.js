import { db } from "../index.js"
import {v4 as uuid} from "uuid"

// CADASTRAR UM NOVO USUÁRIO
export async function signUpUser(req, res) {
    let newUser = req.user
    
    try {
        //Signup new user
        await db.collection("users").insertOne(newUser)
        res.status(200).send({message: "Usuário cadastrado com sucesso!"})
    } catch (error) {
        console.log(error)
    }
}

// LOGANDO O USUÁRIO 
export async function signInUser(req, res){
    let user = req.user
    const token = uuid()

    const newSession = {
        userId: user._id,
        token
    }

    try{
        //Create new session login
        db.collection("sessions").insertOne(newSession)
    } catch(error){
        res.send(error)
    }

    res.send({ nome: user.nome, token})
}
  
//PEGAR USUÁRIO
export async function getUsers(req,res){
    let users;
    

    try{
        users = await db.collection("users").find().toArray()

        res.send(users)
    } catch(error){
        res.send(error)
    }

}

