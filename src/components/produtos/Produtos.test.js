import { render, screen } from '@testing-library/react';
import Produtos from './Produtos';

describe('Teste do componente Produtos', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<Produtos visivel={true} adicionarProduto={() => false} />);
    const botoes = screen.getAllByText(/comprar/i);
    expect(botoes).toBeTruthy()
  });
})