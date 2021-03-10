import { Form, Row, Col, Button, Jumbotron, Modal } from 'react-bootstrap'
import DatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt', pt)

function Checkout() {
  return (
    <h1>Checkout</h1>
  )
}

export default Checkout