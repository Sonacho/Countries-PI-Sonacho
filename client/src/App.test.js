import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

test('renders learn react link', () => {
  render(<Provider store={store}><Router><App /></Router></Provider>);
/*   const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); */
});


