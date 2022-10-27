const jwt = require("jsonwebtoken")

const generateToken =(id)=>{
    return jwt.sign({id},"MADHU",{
        expiresIn:"30d"
    })
}

module.exports= generateToken