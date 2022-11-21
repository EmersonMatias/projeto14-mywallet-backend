
import joi from "joi"
import { db } from "../index.js"

// VALIDAR OS DADOS DO USUÁRIO PARA SEREM INSERIDOS
export async function validateDataUser(req, res, next) {
    const newData = req.body
    const auth = req.headers.authorization?.split(" ")
    const token = auth[1]
    let userSession;
  
    //Check if token exist
    if (!token) {
        return res.status(400).send("Por favor, faça login")
    }

    const dataSchema = joi.object({
                description: joi.string().required().min(3),
                value: joi.number().required().greater(0),
                date: joi.date().required(),
                type: joi.string().required().valid("input", "output")
    })

    const { error } = dataSchema.validate(newData, { abortEarly: false })

    //Check if object schema is correct
    if (error) {
        return res.send(error.message)
    }

    try {
        userSession = await db.collection("sessions").findOne({ token })
        
        //Check if token session exist
        if (!userSession) {
            return res.status(400).send("Token Inválido.")
        }
    } catch (error) {
        res.send(error)
    }

    //Data to register
    req.newData = { userId: userSession.userId, ...newData }

    next()
}

// VALIDAR PARA PEGAR DADOS DO USUÁRIO
export async function validateGetDataUsers(req, res, next) {
    const auth = req.headers.authorization?.split(" ")
    const token = auth[1]
    let userSession;

    //Check if token exist
    if (!token) {
        return res.send("Token inexistente")
    }

    try {
        userSession = await db.collection("sessions").find({ token }).toArray()

        //Check if token session exist
        if (!userSession.length) {
            return res.send("Token inválido")
        }
    } catch (error) {
        res.send(error)
    }

    //Take userID
    req.userId = userSession[0]?.userId


    next()
}

