const userBD=require("../models/UserBD.js");
const servicePassword=require("../helpers/servicePassword.js");
const jwt=require("../helpers/serviceJWT.js");

const registerUser=async(req,res)=>{
    try {
        const {email,password, rol,lenguage}=req.body;

        if (
            !email.trim() ||
            !password.trim() ||
            rol === 'Seleccione un rol' ||
            lenguage === 'Seleccione un Lenguage'
          ) {
            return res.status(400).json({message:'Todos los campos son obligatorias'})
          }

        const passHash=servicePassword.encryptPassword(password);

        const User={
            email,
            password: passHash,
            rol,
            lenguage
        };

        const data= await userBD.registerUser(User);

        if(!data){
            return res.status(400).json({message:'Problemas al registrar el usuario'})
        }

        res.status(201).json({message:"OK"});

    } catch (error) {
        console.log(error.stack)
    }
}


const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({message:'Todos los campos son obligatorias'});
          }

        const user=await userBD.loginUser(email);

        const checkPassword= servicePassword.verifyPassword(password,user.password);

        if(!checkPassword){
            return res.status(400).json({message:'Credenciales incorrectas'})
        }
        
        const token= jwt.generateToke(user.email,user.rol,user.lenguage);

        res.status(200).json({token});

    } catch (error) {
        console.log(error.stack)
    }
}

const getUser = async(req,res)=>{
    try {
        
        const user=req.user;

        const valido=await userBD.checkUserToken(user);

        if(parseInt(valido)!==1){
            return res.status(400).json({message:'Token invalido'})
        }
        
        res.status(200).json([user]);

    } catch (error) {
        console.log(error.stack)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}