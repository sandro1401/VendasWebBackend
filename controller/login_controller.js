const loginService = require('../service/auth/login_service')
function realizarLogin(req, res) {
     const user = req.body;
     try{ 
        const token = loginService.verificarLogin(user);
        res.status(201).json({token:token});
     }
     catch(err) {
        res.status(401).json(err);
     }
}

 



module.exports = {
    realizarLogin
}