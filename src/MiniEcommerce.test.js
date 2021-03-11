import { render, screen } from '@testing-library/react';
import MiniEcommerce from './MiniEcommerce';

describe('Teste do componente Mini-Ecommerce', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<MiniEcommerce />);
    const linkElement = screen.getByText(/mini-ecommerce/i);
    expect(linkElement).toBeInTheDocument();
  });
})
