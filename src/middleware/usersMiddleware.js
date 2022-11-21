import joi  from "joi"
import { db } from "../index.js"
import { hashSync, compareSync } from "bcrypt"

// VERIFICAR DADOS DO NOVO USUARIO PARA CADASTRO
export async function validateSignUp(req, res, next) {
    const newUser = req.body
    console.log(newUser.email)

    const signUpSchema = joi.object({
        nome: joi.string().required().min(3),
        email: joi.string().required().email(),
        senha: joi.string().required().min(8).max(25)
    })

    const { error } = signUpSchema.validate(newUser, { abortEarly: false })
    // Check if schema is correct
    if (error) {
        return res.send(error.message)
    }

    try {
        const existingEmail = await db.collection("users").findOne({ email: newUser.email })

        //Check if email alredy exist
        if (existingEmail) {
            return res.status(409).send({message: "Email já cadastrado"})
        }
    } catch (error) {
        console.log(error)
    }

    const encryptedPassword = hashSync(newUser.senha, 10)

    req.user = { ...newUser, senha: encryptedPassword }

    next()
}

//VERIFICAR DADOS DE SIGN IN
export async function validateSignIn(req, res, next) {
    const user = req.body
    let userExist;

    const signInSchema = joi.object({
        email: joi.string().required().email(),
        senha: joi.string().required().min(8).max(25)
    })

    const { error } = signInSchema.validate(user, { abortEarly: false })
    
    //Check if schema is correct 
    if (error) {
        return res.status(401).send(error.message)
    }
  
    try {
        userExist = await db.collection("users").findOne({ email: user.email })
        
        //Check if email exist
        if (!userExist) {
            return res.status(401).send("Email não cadastrado")
        }

        const validPassword = compareSync(user.senha,userExist.senha)

        // Check if passwords are the same
        if(!validPassword){
            return res.status(401).send("Senha inválida")
        }

    } catch (error) {
        console.log(error)
    }

    //DELETANDO DADOS SENSÍVEIS
    delete userExist.senha

    req.user = userExist

    next()
} 