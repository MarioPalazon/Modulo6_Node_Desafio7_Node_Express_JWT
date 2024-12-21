const jwt =require("../helpers/serviceJWT.js");


const authenticate= (req,res,next)=>{
    
    const token=req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"sin autorizacion"});
    }

    const user= jwt.verifyToken(token);
    
    if(!user){
        return res.status(401).json({error:"sin autorizacion"})
    }

    req.user=user;

    next();

}

module.exports=authenticate;