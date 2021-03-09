import { render, screen } from '@testing-library/react';
import Menu from './Menu';

describe('Teste do componente Menu', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<Menu />);
    const linkElement = screen.getByText(/menu/i);
    expect(linkElement).toBeInTheDocument();
  });
})