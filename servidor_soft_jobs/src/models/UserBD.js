const pool =require("../config/db.js");


const registerUser= async ( User)=>{
    
    const {email,password,rol,lenguage}=User;

    const exists= await checkUser(email);
    
    if(exists>0){
        return undefined;
    }
    
    const consulta="insert into usuarios (email,password,rol,lenguage) values ($1,$2,$3,$4) returning *";
    const parametros=[email,password,rol,lenguage];

    const {rows}=await pool.query(consulta,parametros);

    return rows;

}

const checkUser = async (email)=>{

    const consulta="select count(*) from usuarios where email=$1";
    const parametros=[email]

    const {rows}= await pool.query(consulta,parametros);
    
    return rows[0].count;
}

const checkUserToken= async (User)=>{

    const {email,rol,lenguage}=User;

    const consulta="select count(*) from usuarios where email= $1 and rol=$2 and lenguage=$3";
    const parametros=[email,rol,lenguage]

    const {rows}= await pool.query(consulta,parametros);

    return rows[0].count;

}

const loginUser = async(email)=>{

    const consulta="select email, password,rol,lenguage from usuarios where email=$1";
    const parametros=[email];

    const {rows}=await pool.query(consulta,parametros);

    return rows[0];
}


module.exports={
    registerUser,
    loginUser,
    checkUserToken
}
