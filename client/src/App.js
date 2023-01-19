import './App.css';
import React from 'react'
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Countries from './components/Country/Countries';
import NavBar from './components/Nav/NavBar';
import CountryDetail from './components/CountryDetail/CountryDetail';
import AddActivity from './components/AddActivity/AddActivity';
import SearchBar from './components/SearchBar/SearchBar';
import FilterSort from './components/FilterSort/FilterSort';
import axios from 'axios';
axios.defaults.baseURL = 'https://countries-pi-sonacho-production.up.railway.app'

function App() {

    
  return (
    
    <>
      <Route><NavBar/></Route>
      <Route exact path ={'/'} component={LandingPage}/>
      <Route exact path = {'/countries'}><SearchBar/></Route>
      <Route exact path = {'/countries'}><FilterSort/></Route>
      <Route exact path={'/countries'} ><Countries/></Route>
      <Route path={'/countries/:id'} ><CountryDetail/></Route>
      <Route exact path={'/add'} ><AddActivity/></Route>
      {/* <Route path="*"><Redirect to="/" /></Route>   */}
    </>
  );
}

export default App;
