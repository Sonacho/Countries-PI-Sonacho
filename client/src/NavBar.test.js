import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from './components/Nav/NavBar.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';



describe('NavBar', () => {
  test('should render without crashing', () => {
    const {getByText} = render(<Provider store={store}><Router><NavBar /></Router></Provider>);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Create Activity')).toBeInTheDocument();
  });
  test('Come link redirects to /countries page', () => {
    const {getByText} = render(<Provider store={store}><Router><NavBar /></Router></Provider>);
    const homeLink = getByText('Home');
    expect(homeLink.getAttribute('href')).toBe('/countries');
  });
  test('Create Activity link redirects to /add page', () => {
    const {getByText} = render(<Provider store={store}><Router><NavBar /></Router></Provider>);
    const homeLink = getByText('Create Activity');
    expect(homeLink.getAttribute('href')).toBe('/add');
  });
});
