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

  return (
    <div>
      <Menu />
      <Produtos
        visivel={exibirProdutos}
        adicionarProduto={adicionarProduto} />
      <Checkout />
    </div>
  );
}

export default MiniEcommerce;
