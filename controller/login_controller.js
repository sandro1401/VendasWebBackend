const loginService = require('../service/auth/login_service')
const negocio = require('../negocio/usuario_negocio')

async function realizarLogin(req, res) {
  const user = req.body;

  try { 
     
      if (!user.email || !user.senha) {
          throw new Error("Email ou senha não fornecidos");
      }
      const usuarioValido = await negocio.buscarUsuarioPorEmail(user.email)
      if (user.email !== usuarioValido.email || user.senha !== usuarioValido.senha) {
          throw new Error("Credenciais inválidas");
      }

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