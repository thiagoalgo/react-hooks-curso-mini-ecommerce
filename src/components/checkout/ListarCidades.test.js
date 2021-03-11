import { render } from '@testing-library/react';
import ListarCidades from './ListarCidades';
import axiosMock from 'axios'

describe('Teste do componente ListarCidades', () => {
  test('deve renderizar o componente corretamente', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: ['São Paulo', 'São Pedro']})
    const { findByTestId } = render(<ListarCidades estado='SP' />);
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(await findByTestId('São Paulo')).toHaveTextContent('São Paulo')
    expect(await findByTestId('São Pedro')).toHaveTextContent('São Pedro')
  });
})