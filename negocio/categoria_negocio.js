const persistencia = require('../persistencia/categoria_persistence')


// Iniciando CRUD

// Create
async function addCategoria(categorias) {
    const nomeCategoria = await persistencia.buscarCategoriaPorNome(categorias.nome)
   
    if (nomeCategoria) {
        throw ({status: 400, message: "Categoria já existente."})
    }

    
    if (categorias && categorias.nome ) {
        try {
            const categoria = await persistencia.addCategoria(categorias)
            return categoria
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Read
async function buscarCategoria() {
    try {
        const categoria = await persistencia.buscarCategoria()

        if (categoria.length == 0) {
            const erro = new Error()
            erro.message = "Não há Categorias cadastrados."
            erro.status = 404
            throw erro
        }

        return categoria
    } catch (error) { throw error }
}

async function buscarCategoriaPorNome(nome) {
    try {
        const nomeCategoria = await persistencia.buscarCategoriaPorNome(nome)

        if (!nomeCategoria) {
            const erro = new Error()
            erro.message = "Nome de categoria não encontrado."
            erro.status = 404
            throw erro
        }

        return nomeCategoria
    } catch (error) { throw error }
}


async function buscarCategoriaPorId(id) {
    try {
        const idCategoria = await persistencia.buscarCategoriaPorId(id)

        if (!idCategoria) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idCategoria
    } catch (error) { throw error }
}

// Update
async function atualizarCategoria(id, categorias) {
    if (categorias && categorias.nome ) {
        const categoriaAtualizado = await persistencia.atualizarCategoria(id, categorias)

        if (!categoriaAtualizado) {
            let erro = new Error()
            erro.message = "Usuário não encontrado."
            erro.status = 404
            throw erro
        }

        return categoriaAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Delete
async function deletarCategoria(id) {
    try {
        const categoriaDeletada =  await persistencia.deletarCategoria(id)

        if (!categoriaDeletada) {
            const erro = new Error()
            erro.message = "Usuário não encontrado"
            erro.status = 404
            throw erro
        }

        return categoriaDeletada
    } catch (error) { throw error }
}


module.exports = {
    addCategoria,
    buscarCategoria,
    buscarCategoriaPorNome,
   
    buscarCategoriaPorId,
    atualizarCategoria,
    deletarCategoria
}