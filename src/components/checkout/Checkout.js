import { Form, Row, Col, Button, Jumbotron, Modal, FormCheck } from 'react-bootstrap'
import DatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt'
import 'react-datepicker/dist/react-datepicker.css'
import ListarEstados from './ListarEstados'
import ListarCidades from './ListarCidades'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup'
import { validarCpf, formatarCpf } from '../../utils/cpf-util'
import formatarCep from '../../utils/cep-util'
import axios from 'axios'

registerLocale('pt', pt)

function Checkout(props) {

  const CHECKOUT_URL = 'http://localhost:3001/mini-ecommerce/checkout/finalizar-compra'

  const [dataNascimento, setDataNascimento] = useState(null)
  const [formEnviado, setFormEnviado] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showErroModal, setShowErroModal] = useState(false)

  const schema = yup.object({
    email: yup.string().email().required(),
    nomeCompleto: yup.string().required().min(5),
    cpf: yup.string().required().min(14).max(14)
      .test('cpf-valido', 'CPF inválido', cpf => validarCpf(cpf)),
    endereco: yup.string().required().min(5),
    estado: yup.string().required(),
    cidade: yup.string().required(),
    cep: yup.string().required().min(9).max(9),
    emailPromocional: yup.string().required(),
    termosCondicoes: yup.bool().oneOf([true])
  })

  function visivel() {
    return props.visivel ? null : 'hidden'
  }

  async function finalizarCompra(dados) {
    if (!dataNascimento) {
      setFormEnviado(true)
      return
    }

    dados.dataNascimento = dataNascimento
    dados.produtos = props.produtos
    dados.total = `R$ ${props.total}`

    try {
      await axios.post(CHECKOUT_URL, dados)
      setShowModal(true)
      props.handleLimparCarrinho()
    } catch (error) {
      console.log(error)
      setShowErroModal(true)
    }
  }

  function handleDataNascimento(data) {
    setDataNascimento(data)
  }

  function DatePickerCss() {
    if (!formEnviado) {
      return 'form-control'
    }

    if (dataNascimento) {
      return 'form-control is-valid'
    } else {
      return 'form-control is-invalid'
    }
  }

  function handleContinuar() {
    setShowModal(false)
    props.handleExibirProdutos()
  }

  function handleFecharErroModal() {
    setShowErroModal(false)
  }

  return (
    <Jumbotron
      fluid
      style={{ margin: '10px' }}
      className={visivel()}>
      <h3 className='text-center'>Finalizar compra</h3>

      <Formik
        onSubmit={(values) => finalizarCompra(values)}
        initialValues={{
          email: '',
          nomeCompleto: '',
          cpf: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
          termosCondicoes: false,
          emailPromocional: 'S'
        }}
        validationSchema={schema} >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors
        }) => (
          <Form
            noValidate
            style={{ margin: '10px' }}
            onSubmit={handleSubmit} >
            <Form.Group as={Row} controlId='email'>
              <Form.Label column sm={3}>
                E-mail
            </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type='email'
                  placeholder='Digite seu e-mail'
                  name='email'
                  data-testid='txt-email'
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email} />
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
                  data-testid='txt-nome-completo'
                  value={values.nomeCompleto}
                  onChange={handleChange}
                  isValid={touched.nomeCompleto && !errors.nomeCompleto}
                  isInvalid={touched.nomeCompleto && !!errors.nomeCompleto} />
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
                  locale='pt'
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  placeholderText='Selecione uma data'
                  dateFormat='dd/MM/yyyy'
                  withPortal
                  selected={dataNascimento}
                  onChange={handleDataNascimento}
                  className={DatePickerCss()} />
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
                  data-testid='txt-cpf'
                  value={values.cpf}
                  onChange={e => {
                    e.currentTarget.value = formatarCpf(e.currentTarget.value)
                    handleChange(e)
                  }}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && !!errors.cpf} />
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
                  data-testid='txt-endereco'
                  value={values.endereco}
                  onChange={handleChange}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && !!errors.endereco} />
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
                  data-testid='estado'
                  value={values.estado}
                  onChange={handleChange}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && !!errors.estado} >
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
                  data-testid='cidade'
                  value={values.cidade}
                  onChange={handleChange}
                  isValid={touched.cidade && !errors.cidade}
                  isInvalid={touched.cidade && !!errors.cidade} >
                  <option value="">Selecione a sua cidade</option>
                  <ListarCidades estado={values.estado} />
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
                  data-testid='txt-cep'
                  value={values.cep}
                  onChange={e => {
                    e.currentTarget.value = formatarCep(e.currentTarget.value)
                    handleChange(e)
                  }}
                  isValid={touched.cep && !errors.cep}
                  isInvalid={touched.cep && !!errors.cep} />
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
                style={{ marginLeft: '15px' }}
                checked={values.emailPromocional === 'S'}
                onChange={handleChange} />
              <FormCheck
                inline
                name='emailPromocional'
                type='radio'
                id='promocaoNao'
                value='N'
                label='Não'
                style={{ marginLeft: '15px' }}
                checked={values.emailPromocional === 'N'}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Row} controlId='termosCondicoes'>
              <FormCheck
                name='termosCondicoes'
                label='Concordo com os termos e condições'
                style={{ marginLeft: '15px' }}
                data-testid='termos-condicoes'
                value={values.termosCondicoes}
                onChange={handleChange}
                isValid={touched.termosCondicoes && !errors.termosCondicoes}
                isInvalid={touched.termosCondicoes && !!errors.termosCondicoes} />
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
        )}
      </Formik>

      <Modal
        show={showModal}
        onHide={handleContinuar}
        data-testeid='modal-compra-sucesso'>
        <Modal.Header closeButton>
          <Modal.Title>Compra finalizada com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Um email de confirmação será enviado com os detalhes da transação
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success'
          onClick={handleContinuar}>Continuar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErroModal}
        onHide={handleFecharErroModal} 
        data-testeid='modal-erro-comprar'>
        <Modal.Header closeButton>
          <Modal.Title>Erro ao processar pedido!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tente novamente mais tarde
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={handleFecharErroModal}>Continuar</Button>
        </Modal.Footer>
      </Modal>
    </Jumbotron>
  )
}

Checkout.propTypes = {
  total: PropTypes.string.isRequired,
  visivel: PropTypes.bool.isRequired,
  produtos: PropTypes.object.isRequired,
  handleExibirProdutos: PropTypes.func.isRequired,
  handleLimparCarrinho: PropTypes.func.isRequired
}

export default Checkout