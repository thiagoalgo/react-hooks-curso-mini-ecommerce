import './MiniEcommerce.css';
import { useState } from "react";
import Menu from './components/menu/Menu'
import Produtos from './components/produtos/Produtos'
import Checkout from './components/checkout/Checkout'

function MiniEcommerce() {
  const [carrinho, setCarrinho] = useState({ produtos: [] })
  const [exibirProdutos, setExibirProdutos] = useState(true)
  const [exibirCheckout, setExibirCheckout] = useState(false)
  const [total, setTotal] = useState('0,00')

  function adicionarProduto(produto) {
    const objCarrinho = Object.assign({}, carrinho)

    let novoProduto = true
    objCarrinho.produtos.forEach((prod, indice) => {
      if (prod.nome === produto.nome) {
        objCarrinho.produtos[indice].quantidade++
        novoProduto = false
      }
    })

    if (novoProduto) {
      objCarrinho.produtos.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      })
    }

    setCarrinho(objCarrinho)
  }

  function handleExibirProdutos() {
    setExibirCheckout(false)
    setExibirProdutos(true)
  }

  function handleExibirCheckout(total) {
    setExibirCheckout(true)
    setExibirProdutos(false)
    setTotal(total)
  }

  function handleLimparCarrinho() {
    setCarrinho({ produtos: [] })
  }

  return (
    <div>
      <Menu
        handleExibirCheckout={handleExibirCheckout}
        handleExibirProdutos={handleExibirProdutos}
        produtos={carrinho.produtos} />
      <Produtos
        visivel={exibirProdutos}
        adicionarProduto={adicionarProduto} />
      <Checkout
        visivel={exibirCheckout}
        produtos={carrinho}
        total={total}
        handleExibirProdutos={handleExibirProdutos}
        handleLimparCarrinho={handleLimparCarrinho} />
    </div>
  );
}

export default MiniEcommerce;
