const jwt = require('jsonwebtoken')
const securityKey = "Kisalay#18152231$"

function setVoter(user){
    return jwt.sign({
        id: user._id,
        name: user.name,
        hasVoted: user.hasVoted,
        age: user.age,
        role: user.role,
        aadharId: user.aadharId
    }, securityKey)
}

function getVoter(token){
    try{
        if(!token)  return null;
        return jwt.verify(token, securityKey)
    }catch(err){
        return null;
    }
}


module.exports={
    setVoter,
    getVoter
}
