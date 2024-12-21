var bcrypt = require('bcryptjs');

const encryptPassword=(password)=>{

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

const verifyPassword=(password,hash)=>{
    
    const check=bcrypt.compareSync(password, hash);

    return check;
}

module.exports={
    encryptPassword,
    verifyPassword
};