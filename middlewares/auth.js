const adminAuth = (req, res, next)=>{
  const token = "kdsjf";
  const isAdminUser = token === "kdsdasdasdjf";
  if(!isAdminUser)
  {
    res.status(401).send("Please authorize");
  }else{
    next();
  }
};

module.exports = {adminAuth};

