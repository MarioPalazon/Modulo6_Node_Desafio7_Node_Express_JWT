require("dotenv/config");

const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const loggerService=require("./middlewares/loggerService.js");

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//usando middleware de logger por consola
app.use(loggerService);

//obtenemos la rutas del controlador usuario
const UsuarioRoutes=require("./routes/usuarioRoutes.js");
const SinRoutes=require("./routes/sinRoutes.js");
//establecemos los routes
app.use("/",UsuarioRoutes);
app.use("*",SinRoutes);


const PORT=process.env.PORTSERVIDOR || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor Iniciado en puerto: ${PORT} en http://localhost:${PORT}`)
});
