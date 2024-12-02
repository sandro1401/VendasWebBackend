const loginService = require('../service/auth/login_service')
const negocio = require('../negocio/usuario_negocio')

// function realizarLogin(req, res) {
//      const user = req.body;
   
//      try{ 
//         const token = loginService.verificarLogin(user);
//         res.status(201).json({token:token});
//      }
//      catch(err) {
//         res.status(401).json(err);
//      }
     
// }
// function validarUsuario(token){
//    const usuario = loginService.validarToken(token)
//    return usuario
// }
async function realizarLogin(req, res) {
  const user = req.body;
  console.log (user)

  try { 
      // Simule uma consulta ao banco (ou use a sua lógica existente)
      if (!user.email || !user.senha) {
          throw new Error("Email ou senha não fornecidos");
      }

      // Substitua por uma busca real ao banco de dados
      const usuarioValido = await negocio.buscarUsuarioPorEmail(user.email)
         
      console.log(usuarioValido)
      if (user.email !== usuarioValido.email || user.senha !== usuarioValido.senha) {
          throw new Error("Credenciais inválidas");
      }

      // Gera o token após validar
      const token = loginService.gerarToken(usuarioValido);
      res.status(201).json({ token });
  } catch (err) {
      res.status(401).json({ error: err.message });
  }
}

function obterUsuarioLogado(req, res) {
   try {
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) {
       return res.status(401).json({ message: 'Token não fornecido' });
     }
 
     const usuario = loginService.validarToken(token);
     res.status(200).json(usuario);
   } catch (error) {
    console.error('Erro ao obter usuário logado:', error.message);
     res.status(401).json({ message: error.message });
   }
 }



module.exports = {
    realizarLogin,
   obterUsuarioLogado

}