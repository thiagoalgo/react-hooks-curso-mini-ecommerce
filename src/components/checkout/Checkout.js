import { Form, Row, Col, Button, Jumbotron, Modal, FormCheck } from 'react-bootstrap'
import DatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt'
import 'react-datepicker/dist/react-datepicker.css'
import ListarEstados from './ListarEstados'
import ListarCidades from './ListarCidades'
import { useState } from 'react'

registerLocale('pt', pt)

function Checkout(props) {

  const [estado, setEstado] = useState('')

  function handleChangeEstado(event) {
    setEstado(event.target.value)
  }

  return (
    <Jumbotron
      fluid
      style={{ margin: '10px' }} >
      <h3 className='text-center'>Finalizar compra</h3>

      <Form noValidate style={{ margin: '10px' }}>
        <Form.Group as={Row} controlId='email'>
          <Form.Label column sm={3}>
            E-mail
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type='email'
              placeholder='Digite seu e-mail'
              name='email'
              data-testid='txt-email' />
            <Form.Control.Feedback type='invalid'>
              Digite um e-mail válido
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='nomeCompleto'>
          <Form.Label column sm={3}>
            Nome Completo
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type='text'
              placeholder='Digite seu nome completo'
              name='nomeCompleto'
              data-testid='txt-nome-completo' />
            <Form.Control.Feedback type='invalid'>
              Digite seu nome completo (mínimo 5 caracteres)
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='dataNascimento'>
          <Form.Label column sm={3}>
            Data de Nascimento
          </Form.Label>
          <Col sm={9}>
            <DatePicker
              className='form-control'
              locale='pt'
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              placeholderText='Selecione uma data'
              dateFormat='dd/MM/yyyy'
              withPortal />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='cpf'>
          <Form.Label column sm={3}>
            CPF
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type='text'
              placeholder='Digite seu cpf'
              name='cpf'
              data-testid='txt-cpf' />
            <Form.Control.Feedback type='invalid'>
              Digite um CPF válido
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='endereco'>
          <Form.Label column sm={3}>
            Endereço
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type='text'
              placeholder='Digite seu endereço completo'
              name='endereco'
              data-testid='txt-endereco' />
            <Form.Control.Feedback type='invalid'>
              Digite um endereço válido
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='estado'>
          <Form.Label column sm={3}>
            Estado
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as='select'
              name='estado'
              onChange={handleChangeEstado}
              data-testid='estado'>
              <ListarEstados />
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Selecione o seu estado
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='cidade'>
          <Form.Label column sm={3}>
            Cidade
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as='select'
              name='cidade'
              data-testid='cidade'>
              <option value="">Selecione a sua cidade</option>
              <ListarCidades estado={estado} />
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Selecione a sua cidade
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='cep'>
          <Form.Label column sm={3}>
            CEP
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type='text'
              placeholder='Digite seu CEP'
              name='cep'
              data-testid='txt-cep' />
            <Form.Control.Feedback type='invalid'>
              Digite um CEP válido
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='emailPromocional'>
          <Form.Label column sm={12}>
            Deseja receber e-mail com promoções?
          </Form.Label>
          <FormCheck
            inline
            name='emailPromocional'
            type='radio'
            id='promocaoSim'
            value='S'
            label='Sim'
            style={{ marginLeft: '15px' }} />
          <FormCheck
            inline
            name='emailPromocional'
            type='radio'
            id='promocaoNao'
            value='N'
            label='Não'
            style={{ marginLeft: '15px' }} />
        </Form.Group>

        <Form.Group as={Row} controlId='termosCondicoes'>
          <FormCheck
            name='termosCondicoes'
            label='Concordo com os termos e condições'
            style={{ marginLeft: '15px' }}
            data-testid='termos-condicoes' />
        </Form.Group>

        <Form.Group as={Row} controlId='finalizarCompra'>
          <Col sm={12} className='text-center'>
            <Button
              type='submit'
              variant='success'
              data-testid='btn-finalizar-compra'>
              Finalizar compra
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Modal show={false} data-testeid='modal-compra-sucesso'>
        <Modal.Header closeButton>
          <Modal.Title>Compra finalizada com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Um email de confirmação será enviado com os detalhes da transação
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success'>Continuar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={false} data-testeid='modal-erro-comprar'>
        <Modal.Header closeButton>
          <Modal.Title>Erro ao processar pedido!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tente novamente mais tarde
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning'>Continuar</Button>
        </Modal.Footer>
      </Modal>
    </Jumbotron>
  )
}

export default Checkout