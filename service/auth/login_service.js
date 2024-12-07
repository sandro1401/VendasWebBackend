const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const CHAVE_SECRETA = "Vendas@2024";

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

function verificarLogin(user) {
  if (!user.id || !user.nome || !user.email) {
    throw new Error('Usuário inválido ou dados incompletos');
  }

  const token = gerarToken(user); // Gera o token com os dados corretos
  return token;
}


function login(usuario) {
   
    if (usuario == usuario.email && usuario == usuario.senha) {
      const token = this.gerarToken(usuario);
      return { token };
    } else {
      throw new Error('Credenciais inválidas');
    }
  }


  function gerarToken(usuario) {
    if (!usuario.id || !usuario.nome || !usuario.email) {
      throw new Error('Informações do usuário estão incompletas para gerar o token');
    }
  
    const payload = { 
      id: usuario.id, 
      nome: usuario.nome, 
      email: usuario.email,
      tipo: usuario.tipo
    };
 
    return jwt.sign(payload, CHAVE_SECRETA, { expiresIn: '1h' }); // Token válido por 1 hora
  }
  
  
 
  function validarToken(token) {
    try {
      const payload = jwt.verify(token, CHAVE_SECRETA);
  
      // Log para depuração
      console.log('Payload decodificado:', payload);
  
      if (!payload.id || !payload.nome || !payload.email) {
        throw new Error('Token não contém as informações necessárias');
      }
  
      return { 
        id: payload.id, 
        nome: payload.nome, 
        email: payload.email, 
        tipo: payload.tipo
      };
    } catch (error) {
      console.error('Erro ao validar o token:', error.message);
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
