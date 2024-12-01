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
// function validarUsuario(token){
//    const usuario = loginService.validarToken(token)
//    return usuario
// }

function obterUsuarioLogado(req, res) {
   try {
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) {
       return res.status(401).json({ message: 'Token não fornecido' });
     }
 
     const usuario = loginService.validarToken(token);
     res.status(200).json(usuario);
   } catch (error) {
     res.status(401).json({ message: error.message });
   }
 }



module.exports = {
    realizarLogin,
   obterUsuarioLogado

}