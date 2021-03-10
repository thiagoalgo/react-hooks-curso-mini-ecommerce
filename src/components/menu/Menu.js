import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingBasket,
  faCashRegister,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { propTypes } from 'react-bootstrap/esm/Image'

function Menu(props) {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href=''>Mini-ecommerce</Navbar.Brand>
      <Navbar.Collapse className='justify-content-end'>
        <Nav>
          <NavDropdown
            title={
              <div style={{ display: 'inline-block' }}>
                <FontAwesomeIcon icon={faShoppingCart} />
                &nbsp;
                Carrinho
              </div>
            }
            drop='left'
          >
            <NavDropdown.Item
              href=''
              onClick={props.handleExibirProdutos}>
              <FontAwesomeIcon icon={faShoppingBasket} />
              &nbsp;
              <strong>Produtos</strong>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href=''>
              {/* itens do carrinho */}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href=''
              data-testid='total-carrinho'>
              Total: R$ {/* valor total itens do carrinho */}
            </NavDropdown.Item>
            <span className={props.produtos.length === 0 ? 'hidden' : null}>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href=''
                style={{ color: 'green' }}
                onClick={props.handleExibirCheckout}>
                <FontAwesomeIcon icon={faCashRegister} />
                &nbsp;
                Finalizar compra
              </NavDropdown.Item>
            </span>
          </NavDropdown>

        </Nav>
      </Navbar.Collapse >
    </Navbar >
  )
}

Menu.propTypes = {
  produtos: PropTypes.array.isRequired,
  handleExibirProdutos: PropTypes.func.isRequired,
  handleExibirCheckout: PropTypes.func.isRequired
}

export default Menu