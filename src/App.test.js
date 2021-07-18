import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title description', () => {
  render(<App />);
  const titleElement = screen.getByText(/Simple DeepL API integration/i);
  expect(titleElement).toBeInTheDocument();
});
