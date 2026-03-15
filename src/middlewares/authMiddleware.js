const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
  try{
const authHeader = req.headers.authorization;
if(!authHeader || !authHeader.startsWith('Bearer'))
{
  return res.send('please enter token');
}
const token = authHeader.split(' ')[1];
const decode = jwt.verify(token, process.env.JWT_SECRET);
req.user = decode;
next();
  }catch(err)
  {
    res.send('Invalid token');
  }

};

module.exports = {requireAuth};