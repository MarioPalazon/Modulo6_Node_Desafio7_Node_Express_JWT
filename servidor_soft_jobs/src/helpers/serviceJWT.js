const jwt = require("jsonwebtoken");


const generateToke = (email,rol,lenguage)=>{
    
    const signSecret= process.env.JWTKEYSECRET;
    
    const token=jwt.sign({email,rol,lenguage},signSecret);

    return token;

}

const verifyToken = (token)=>{

    const signSecret= process.env.JWTKEYSECRET;
    jwt.verify(token,signSecret);

    return jwt.decode(token);

}

module.exports={
    generateToke,
    verifyToken
}