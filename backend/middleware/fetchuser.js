var jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token');   //extract the authantication toeken form header
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"});
    }
    try{
        const data = jwt.verify(token , JWT_SECRET); //verify and extract the payload 
        req.user = data.data.user;   // save the user id
        next(); // resume the remaining fuction in auth.js
    }catch(error){
        res.status(401).send({error: "please authenticate using a valid token"});
    }
}

module.exports = fetchuser;