import ListarProdutos from './ListarProdutos'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'

function Produtos(props) {
  const [exibirMsg, setExibirMsg] = useState(false)
  const [produto, setProduto] = useState('')

  function visivel() {
    return props.visivel ? null : 'hidden'
  }

  function exibirMensagem(produto) {
    setExibirMsg(true)
    setProduto(produto.nome)
    setTimeout(() => {
      setExibirMsg(false)
    }, 3000)
  }

  return (
    <div className={visivel()}>
      <Alert 
      variant='success'
      style={{margin: '10px'}}
      show={exibirMsg}>
        <strong>{produto}</strong> adicionado com sucesso ao carrinho
      </Alert>
      <ListarProdutos
      adicionarProduto={props.adicionarProduto}
      exibirMensagem={exibirMensagem} />
    </div>
  )
}

Produtos.propTypes = {
  visivel: PropTypes.bool.isRequired,
  adicionarProduto: PropTypes.func.isRequired
}

export default Produtos