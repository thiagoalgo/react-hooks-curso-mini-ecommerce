import PropTypes from "prop-types";
import { NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'

function ItensCarrinhoMenu(props) {

  function render() {
    if (props.produtos.length === 0) {
      return (
        <NavDropdown.Item data-testid='itens'>
          <FontAwesomeIcon icon={faSadTear} />
          &nbsp;
          Carrinho vazio...
        </NavDropdown.Item>
      )
    } else {
      return props.produtos.map(produto => {
        return (
          <NavDropdown.Item key={produto.nome} data-testid={produto.nome}>
            {`${produto.nome} - ${produto.quantidade} x ${produto.preco}`}
          </NavDropdown.Item>
        )
      })
    }
  }

  return render()
}

ItensCarrinhoMenu.propTypes = {
  produtos: PropTypes.array.isRequired
}

export default ItensCarrinhoMenu