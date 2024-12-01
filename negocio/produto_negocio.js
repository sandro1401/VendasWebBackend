const persistencia = require('../persistencia/produto_persistence')


// Iniciando CRUD

// Create
async function addProduto(produtos) {
    const nomeProduto = await persistencia.buscarProdutoPorNome(produtos.nome)
   
    if (nomeProduto) {
        throw ({status: 400, message: "Produto já existente."})
        
    }
    
    console.log(produtos.nome)
    console.log(produtos.descricao)
    console.log(produtos.imagem_url)
    
    if (produtos && produtos.nome && produtos.descricao && produtos.preco 
        && produtos.categoriaId && produtos.usuarioId &&  produtos.imagem_url) {
            console.log(produtos)
        try {
            const produto = await persistencia.addProduto(produtos)
            return produto
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Read
async function buscarProduto() {
    try {
        const produto = await persistencia.buscarProduto()

        if (produto.length == 0) {
            const erro = new Error()
            erro.message = "Não há Produtos cadastrados."
            erro.status = 404
            throw erro
        }

        return produto
    } catch (error) { throw error }
}

async function buscarProdutoPorNome(nome) {
    try {
        const nomeProduto = await persistencia.buscarProdutoPorNome(nome)

        if (!nomeProduto) {
            const erro = new Error()
            erro.message = "Nome de Produto não encontrado."
            erro.status = 404
            throw erro
        }

        return nomeProduto
    } catch (error) { throw error }
}

async function buscarProdutoPorCategoria(categoriaId) {
    try {
        const categoriaProduto = await persistencia.buscarProdutoPorCategoria(categoriaId)

        if (!categoriaProduto) {
            const erro = new Error()
            erro.message = "categoria de Produto não encontrado."
            erro.status = 404
            throw erro
        }

        return categoriaProduto
    } catch (error) { throw error }
}

async function buscarProdutoPorId(id) {
    try {
        const idProduto = await persistencia.buscarProdutoPorId(id)

        if (!idProduto) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idProduto
    } catch (error) { throw error }
}


//Update
async function atualizarProduto(id, produtos) {
    console.log(produtos)
    if (produtos && produtos.nome && produtos.descricao && produtos.preco 
        && produtos.categoriaId && produtos.usuarioId && produtos.imagem_url ) {
        const produtoAtualizado = await persistencia.atualizarProduto(id, produtos)

        if (!produtoAtualizado) {
            let erro = new Error()
            erro.message = "Produto não encontrado."
            erro.status = 404
            throw erro
        }

        return produtoAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}
async function atualizarImagemProduto(id, produto) {
    if (produto && produto.imagem_url) {
            const atualizarProduto = await persistencia.atualizarImagemProduto(id, produto);

            if (!atualizarProduto) {
                let erro = new Error();
                erro.message = "produto não encontrada.";
                erro.status = 404;
                throw erro;
            }
            return atualizarproduto;
        } else {
            let erro = new Error();
            erro.message = "Todos os campos são obrigatórios.";
            erro.status = 400;
            throw erro;
        }
}

// Delete
async function deletarProduto(id) {
    try {
        const produtoDeletada =  await persistencia.deletarProduto(id)

        if (!produtoDeletada) {
            const erro = new Error()
            erro.message = "Produto não encontrado"
            erro.status = 404
            throw erro
        }

        return produtoDeletada
    } catch (error) { throw error }
}


module.exports = {
    addProduto,
    buscarProduto,
    buscarProdutoPorNome,
    buscarProdutoPorCategoria,
    buscarProdutoPorId,
    atualizarProduto,
    atualizarImagemProduto,
   
    deletarProduto
}