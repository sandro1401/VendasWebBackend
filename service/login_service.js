const jwt = require('jsonwebtoken');

const CHAVE_SECRETA = "Sen@c2024";
const userAdmin = { 
   
    nome: "Admin",
    usuario: "admin",
    senha: "12345"
}

function verificarLogin(user) {
    if(user && user.usuario == userAdmin.usuario
        && user.senha == userAdmin.senha)
    {
        const token = jwt.sign({id:userAdmin.id, nome:userAdmin.nome},
            CHAVE_SECRETA, { expiresIn: '1h' })
        return token;
    }
    
    throw {id:401, message:"Usuario ou senha invalidos"}; 

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


module.exports = {
    verificarLogin,
    verificarToken
}
