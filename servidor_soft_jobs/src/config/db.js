const {Pool} = require("pg");

const pool=new Pool({
    host: process.env.GHOST,
    user:process.env.GUSER,
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE,
    port:process.env.PGPORT,
    allowExitOnIdle:true,
});

//para verificar la conexion si esta bien o mal
pool.connect((err,client,release)=>{
    if(err){
        console.log("Error en la conexion",err.stack);
    }else{
        console.log("Conexion exitosa");
        release();
    }
})

module.exports = pool;