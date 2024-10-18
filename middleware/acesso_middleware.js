const loginService = require('../service/login_service')

function verificarAcesso(req, res, next) {
    try{
        const token = req.get('token');
        loginService.verificarToken(token);
        next();
    }
    catch (err) {
        console.log("Sem acesso! "+err.id)
        res.status(err.id).json(err);
    }
}

module.exports = {
    verificarAcesso
}