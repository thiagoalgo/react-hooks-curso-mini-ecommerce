import { render, screen } from '@testing-library/react';
import Checkout from './Checkout';

describe('Teste do componente Checkout', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<Checkout />);
    const linkElement = screen.getAllByText(/finalizar compra/i);
    expect(linkElement[0]).toBeInTheDocument();
  });
})