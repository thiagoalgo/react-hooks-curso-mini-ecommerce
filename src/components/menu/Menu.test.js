import { render, screen } from '@testing-library/react';
import Menu from './Menu';

describe('Teste do componente Menu', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<Menu
      produtos={[]}
      handleExibirProdutos={() => false}
      handleExibirCheckout={() => false} />);
    const linkElement = screen.getByText(/Mini-ecommerce/i);
    expect(linkElement).toBeInTheDocument();
  });
})