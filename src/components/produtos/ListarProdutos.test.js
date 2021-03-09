import { render } from '@testing-library/react';
import ListarProdutos from './ListarProdutos';

describe('Teste do componente ListarProdutos', () => {
  test('deve renderizar os nomes dos produtos', () => {
    const { getByTestId } = render(<ListarProdutos adicionarProduto={() => false} exibirMensagem={() => false} />);
    expect(getByTestId('card1')).toHaveTextContent('Aprenda Java');
    expect(getByTestId('card2')).toHaveTextContent('JavaScript em 24 horas');
  });

  test('deve renderizar as descrições dos produtos', () => {
    const { getByTestId } = render(<ListarProdutos adicionarProduto={() => false} exibirMensagem={() => false} />);
    expect(getByTestId('card1')).toHaveTextContent('Descrição do produto');
    expect(getByTestId('card2')).toHaveTextContent('Descrição do produto');
  });

  test('deve renderizar os botões com os preços dos produtos', () => {
    const { getByTestId } = render(<ListarProdutos adicionarProduto={() => false} exibirMensagem={() => false} />);
    expect(getByTestId('card1')).toHaveTextContent('Comprar (R$ 59,99)');
    expect(getByTestId('card2')).toHaveTextContent('Comprar (R$ 19,99)');
  });
})