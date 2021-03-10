import { render } from '@testing-library/react';
import ItensCarrinhoMenu from './ItensCarrinhoMenu';

describe('Teste do componente ItensCarrinhoMenu', () => {
  test('deve renderizar o carrinho vazio', () => {
    const { getByTestId } = render(<ItensCarrinhoMenu produtos={[]} />);
    expect(getByTestId('itens')).toHaveTextContent('Carrinho vazio...');
  });

  test('deve renderizar um item no carrinho', () => {
    const produtos = [{ nome: 'Aprenda Java', quantidade: 1, preco: 'R$ 59,99' }]
    const { getByTestId } = render(<ItensCarrinhoMenu produtos={produtos} />);
    expect(getByTestId(produtos[0].nome)).toHaveTextContent(`${produtos[0].nome} - ${produtos[0].quantidade} x ${produtos[0].preco}`);
  });

  test('deve renderizar multiplos itens no carrinho', () => {
    const produtos = [
      { nome: 'Aprenda Java', quantidade: 1, preco: 'R$ 59,99' },
      { nome: 'JavaScript em 24 horas', quantidade: 2, preco: 'R$ 19,99' }
    ]
    const { getByTestId } = render(<ItensCarrinhoMenu produtos={produtos} />);
    expect(getByTestId(produtos[0].nome)).toHaveTextContent(`${produtos[0].nome} - ${produtos[0].quantidade} x ${produtos[0].preco}`);
    expect(getByTestId(produtos[1].nome)).toHaveTextContent(`${produtos[1].nome} - ${produtos[1].quantidade} x ${produtos[1].preco}`);
  });
})