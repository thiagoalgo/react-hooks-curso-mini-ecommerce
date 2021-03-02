import { render, screen } from '@testing-library/react';
import MiniEcommerce from './MiniEcommerce';

test('renders learn react link', () => {
  render(<MiniEcommerce />);
  const linkElement = screen.getByText(/MiniEcommerce/i);
  expect(linkElement).toBeInTheDocument();
});
