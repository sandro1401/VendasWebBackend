const persistencia = require('../persistencia/usuario_persistence')


// Iniciando CRUD

// Create
async function addUsuario(usuarios) {
    const nomeUsuario = await persistencia.buscarUsuarioPorNome(usuarios.nome)
    const emailUsuario = await persistencia.buscarUsuarioPorEmail(usuarios.email)

    if (nomeUsuario) {
        throw ({status: 400, message: "Usuário já existente."})
    }

    if (emailUsuario) {
        throw ({status: 400, message: "E-mail já registrado."})
    }

    if (usuarios && usuarios.nome && usuarios.cpf && usuarios.email && usuarios.senha 
        && usuarios.cep && usuarios.logradouro && usuarios.unidade && usuarios.bairro && usuarios.cidade && usuarios.estado 
        && usuarios.dt_nascimento && usuarios.sexo && usuarios.telefone && usuarios.tipo ) {
        try {
            const usuario = await persistencia.addUsuario(usuarios)
            return usuario
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Read
async function buscarUsuario() {
    try {
        const usuario = await persistencia.buscarUsuario()

        if (usuario.length == 0) {
            const erro = new Error()
            erro.message = "Não há usuários cadastrados."
            erro.status = 404
            throw erro
        }

        return usuario
    } catch (error) { throw error }
}

async function buscarUsuarioPorNome(nome) {
    try {
        const nomeUsuario = await persistencia.buscarUsuarioPorNome(nome)

        if (!nomeUsuario) {
            const erro = new Error()
            erro.message = "Nome não encontrado."
            erro.status = 404
            throw erro
        }

        return nomeUsuario
    } catch (error) { throw error }
}

async function buscarUsuarioPorEmail(email) {
    try {
        const emailUsuario = await persistencia.buscarUsuarioPorEmail(email)

        if (!emailUsuario) {
            const erro = new Error()
            erro.message = "E-mail não encontrado."
            erro.status = 404
            throw erro
        }

        return emailUsuario
    } catch (error) { throw error }
}

async function buscarUsuarioPorId(id) {
    try {
        const idUsuario = await persistencia.buscarUsuarioPorId(id)

        if (!idUsuario) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idUsuario
    } catch (error) { throw error }
}

// Update
async function atualizarUsuario(id, usuarios) {
    if (usuarios && usuarios.nome && usuarios.cpf && usuarios.email && usuarios.senha 
        && usuarios.cep && usuarios.logradouro && usuarios.unidade && usuarios.bairro && usuarios.cidade && usuarios.estado  
        && usuarios.dt_nascimento && usuarios.sexo && usuarios.telefone && usuarios.tipo ) {
        const usuarioAtualizado = await persistencia.atualizarUsuario(id, usuarios)

        if (!usuarioAtualizado) {
            let erro = new Error()
            erro.message = "Usuário não encontrado."
            erro.status = 404
            throw erro
        }

        return usuarioAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Delete
async function deletarUsuario(id) {
    try {
        const usuarioDeletado =  await persistencia.deletarUsuario(id)

        if (!usuarioDeletado) {
            const erro = new Error()
            erro.message = "Usuário não encontrado"
            erro.status = 404
            throw erro
        }

        return usuarioDeletado
    } catch (error) { throw error }
}


module.exports = {
    addUsuario,
    buscarUsuario,
    buscarUsuarioPorNome,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
}