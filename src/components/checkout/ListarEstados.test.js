import { getByText, render, screen } from '@testing-library/react';
import ListarEstados from './ListarEstados';

describe('Teste do componente ListarEstados', () => {
  test('deve renderizar o componente corretamente', () => {
    const { getByTestId } = render(<ListarEstados />);
    expect(getByTestId('AM')).toHaveTextContent('Amazonas')
    expect(getByTestId('SP')).toHaveTextContent('São Paulo')
  });
})