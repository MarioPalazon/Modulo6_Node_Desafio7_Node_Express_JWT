const express=require("express")
const api=express.Router();

//creo las rutas de cada endpoint
api.get("",(req,res)=>{
    res.status(404).send("Esta ruta no existe");
});
api.post("",(req,res)=>{
    res.status(404).send("Esta ruta no existe");
});
api.delete("",(req,res)=>{
    res.status(404).send("Esta ruta no existe");
});
api.put("",(req,res)=>{
    res.status(404).send("Esta ruta no existe");
});

module.exports = api;