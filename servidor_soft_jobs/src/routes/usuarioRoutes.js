const express=require("express")
const api=express.Router();

const authenticate=require("../middlewares/authentication.js")

const UsuarioController=require("../controllers/usuarioController.js");

api.post("/usuarios",UsuarioController.registerUser);
api.post("/login",UsuarioController.loginUser);
api.get("/usuarios",[authenticate],UsuarioController.getUser);


module.exports=api;