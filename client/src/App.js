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
      <Switch>
      <Route exact path ={'/'}><LandingPage/></Route>
      <Route exact path = {'/countries'}><NavBar/><SearchBar/><FilterSort/><Countries/></Route>
      <Route exact path={'/countries/:id'} ><NavBar/><CountryDetail/></Route>
      <Route exact path={'/add'} ><NavBar/><AddActivity/></Route>
      <Route path="/*"><Redirect to="/countries" /></Route>  
      </Switch>
    </>
  );
}

export default App;
