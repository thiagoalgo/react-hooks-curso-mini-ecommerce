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

  return (
    <div>
      <Menu/>
      <Produtos />
      <Checkout />
    </div>
  );
}

export default MiniEcommerce;
