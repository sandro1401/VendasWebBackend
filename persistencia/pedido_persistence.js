const { Client} = require('pg')
const { conexao } = require('./conexao')
const { query } = require('express')


// Create
async function addPedido(usuarioId,pedido) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
   
   
    try {
        await client.query('BEGIN')
        const sqlPedido = `INSERT INTO pedido(quantidade, valorTotal, data_Pedido, produtoId, usuarioId
        ) VALUES($1, $2, $3, $4, $5) RETURNING id`
        const valuesPedido = [pedido.quantidade, pedido.valorTotal, pedido.data_Pedido, pedido.produtoId, usuarioId]

        const pedidoResult = await client.query(sqlPedido, valuesPedido)

        const pedidoId = pedidoResult.rows[0].id;
       
        const sqlPrecoProduto = `SELECT preco FROM produto WHERE id = $1`;
        const precoProdutoResult = await client.query(sqlPrecoProduto, [pedido.produtoId]);
    
        if (precoProdutoResult.rows.length === 0) {
          throw new Error(`Produto com ID ${pedido.produtoId} não encontrado.`);
        }
        const precoUnitario = precoProdutoResult.rows[0].preco;
        
        const sqlItemPedido = `INSERT INTO itemPedido(quantidade, preco_unitario, pedidoId, produtoId, concluido
        ) VALUES($1, $2, $3, $4, $5) RETURNING *`
         const valuesItemPedido = [pedido.quantidade, precoUnitario, pedidoId, pedido.produtoId, 'false' ]

         const itemPedidoResult = await client.query(sqlItemPedido, valuesItemPedido)

         await client.query('COMMIT')
         console.log("itemPedido", itemPedidoResult.rows[0]) 
         return{ pedido: pedidoResult.rows[0], itemPedido: itemPedidoResult.rows[0] };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error 
    }finally{
        client.end()
    }

}

// Read
async function buscarPedido() {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM pedido`
        const pedido = await client.query(sql)

        client.end()
        return pedido.rows
    } catch (error) { throw error }
}

async function buscarPedidoPorUsuarioId(usuarioId) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT usuario.id, pedido. * FROM pedido 
        INNER JOIN usuario ON usuario.id = pedido.usuarioId 
        WHERE pedido.usuarioId = $1`
        const values = [usuarioId]
        const UsuarioPedido = await client.query(sql, values)

        client.end()
        return UsuarioPedido.rows[0]
    } catch (error) { throw error }
}

async function buscarPedidoPorProdutoId(produtoId) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM Pedido WHERE ProdutoId = $1`
        const values = [produtoId]
        const ProdutoPedido = await client.query(sql, values)

        client.end()
        return ProdutoPedido.rows[0]
    } catch (error) { throw error }
}


async function buscarPedidoPorId(id) {
    const client = new Client(conexao)
    client.connect()

    try {
        const sqlPedido = `SELECT * FROM pedido WHERE id = $1`
        const valuesPedido = [id]
        const resultadoPedido = await client.query(sqlPedido, valuesPedido)

        if (resultadoPedido.rows.length === 0) {
            throw new Error(`Pedido com ID ${id} não encontrado.`)
        }

        const pedido = resultadoPedido.rows[0]

       const sqlItens = `
            SELECT i.id, i.quantidade, i.preco_unitario, p.id AS produtoid, p.nome AS produto_nome
            FROM itemPedido i
            INNER JOIN produto p ON i.produtoid = p.id
            WHERE i.pedidoid = $1
        `
        const resultadoItens = await client.query(sqlItens, [id])

        const itens = resultadoItens.rows.map(item => ({
            id: item.id,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            produto: {
                id: item.produtoid,
                nome: item.produto_nome
            }
        }))

        pedido.itens = itens

        client.end()
        return pedido
    } catch (error) {
        client.end()
        throw error
    }
}


// Update
async function atualizarPedido(id, pedido) {
    const client = new Client(conexao);
    client.connect();
  // console.log(id, pedido)
    try {
      await client.query('BEGIN');
  
      // Atualizar o pedido na tabela `pedido`
      const sqlPedido = `
        UPDATE pedido 
        SET quantidade = $1, valorTotal = $2, data_pedido = $3, produtoId = $4, usuarioId = $5
        WHERE id = $6 RETURNING *
      `;
      const valuesPedido = [
        pedido.quantidade,
        pedido.valorTotal,
        pedido.data_Pedido,
        pedido.produtoId,
        pedido.usuarioId, // Adicionei o `usuarioId` para garantir consistência
        id,
      ];
  
      const pedidoAtualizado = await client.query(sqlPedido, valuesPedido);
  
      // Verificar se o produto foi alterado e buscar o novo preço unitário, se necessário
      const sqlPrecoProduto = `SELECT preco FROM produto WHERE id = $1`;
      const precoProdutoResult = await client.query(sqlPrecoProduto, [pedido.produtoId]);
  
      if (precoProdutoResult.rows.length === 0) {
        throw new Error(`Produto com ID ${pedido.produtoId} não encontrado.`);
      }
  
      const precoUnitario = precoProdutoResult.rows[0].preco;
  
     
      const sqlItemPedido = `
        UPDATE itemPedido 
            SET quantidade = $1, preco_unitario = $2, produtoId = $3, concluido = $4 
            WHERE pedidoId = $5 
            RETURNING *;
        `;
      const valuesItemPedido = [
        pedido.quantidade, 
        precoUnitario, 
        pedido.produtoId,  
        false,             
        id               
      ];
     console.log(valuesItemPedido)
      const itemPedidoAtualizado = await client.query(sqlItemPedido, valuesItemPedido);
  
      if (itemPedidoAtualizado.rowCount === 0) {
        const sqlInserirItem = `INSERT INTO itemPedido(quantidade, preco_unitario, pedidoId, produtoId, concluido
        ) VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const valuesInserirItem = [
          pedido.quantidade,
          precoUnitario,
          id,
          pedido.produtoId,
          false,
        ];
  
        await client.query(sqlInserirItem, valuesInserirItem);
      }
  
      await client.query('COMMIT');
  
      return {
        pedido: pedidoAtualizado.rows[0],
        itemPedido: itemPedidoAtualizado.rows[0] || null,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    } finally {
      client.end();
    }
  }
  
// Delete
async function deletarPedido(id) {
  const client = new Client(conexao);
  client.connect();
  console.log(id)

  try {
      await client.query('BEGIN'); 

      const sqlItens = `DELETE FROM itemPedido WHERE pedidoId = $1`;
      const valuesItens = [id];
      await client.query(sqlItens, valuesItens);

      const sqlPedido = `DELETE FROM pedido WHERE id = $1 RETURNING *`;
      const valuesPedido = [id];
      const pedidoDeletado = await client.query(sqlPedido, valuesPedido);

      await client.query('COMMIT'); 
      client.end();

      return pedidoDeletado.rows[0];
  } catch (error) {
      await client.query('ROLLBACK'); 
      client.end();
      throw error;
  }
}


module.exports = {
    addPedido,
    buscarPedido,
    buscarPedidoPorProdutoId,
    buscarPedidoPorUsuarioId,
   
    buscarPedidoPorId,
    atualizarPedido,
    deletarPedido,
    
}