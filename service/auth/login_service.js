const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const CHAVE_SECRETA = "Vendas@2024";
// const userAdmin = { 
   
//     nome: "admin",
//     email: "admin@email.com",
//     senha: "12345"
// }

function verificarLogin(user) {
    
   
        const token = jwt.sign({id:user.id, nome:user.nome},
            CHAVE_SECRETA, { expiresIn: '1h' })
           
        return token;
    

}

function verificarToken(token) {
    try{
        const payload = jwt.verify(token,CHAVE_SECRETA);
        if(payload) {
            return payload;
        }
        else {
            throw {id:401, message:"Token invalido"};
        }
    } catch(err) {
        throw {id:401, message:"Token invalido"};
    }
}
function login(usuario) {
    // Lógica de verificação de credenciais...
    if (usuario == usuario.email && usuario == usuario.senha) {
      const token = this.gerarToken(usuario);
      return { token };
    } else {
      throw new Error('Credenciais inválidas');
    }
  }
  // Nova função para gerar token
  function gerarToken(usuario) {
    const payload = { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo };
    return jwt.sign(payload, CHAVE_SECRETA, { expiresIn: '1h' }); // Token válido por 1 hora
    
  }
 
  // Nova função para validar token
  function validarToken(token) {
    try {
      const payload = jwt.verify(token, CHAVE_SECRETA);
      // Retorne as informações do usuário baseadas no payload
      return { id: payload.id, nome: payload.nome, email: payload.email };
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
module.exports = {
    verificarLogin,
    verificarToken,
    gerarToken,
    login,
    validarToken
   
}
