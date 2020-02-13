import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HeroList from './components/hero-list/HeroList';
import HeroPage from './components/hero-page/HeroPage';
import logo from './logo.png';
import IosHome from 'react-ionicons/lib/IosHome';
import IosSearch from 'react-ionicons/lib/IosSearch';

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <div  className="nav-icons">
          <IosHome className="home-button" fontSize="50px" color="red"/>
          <IosSearch fontSize="50px" color="red"/>
        </div>
        <img className="logo" src={logo}></img>
      </div>
      <div className="overview">
        {/* <img src={marvelBackground}></img> */}
        <h1>Explore The Marvel Universe </h1>
      </div>
      <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ HeroList }/>
        <Route path='/:offset' exact component={ HeroList }/>
        <Route path='/hero/:id/:offset/' exact component={ HeroPage } />
        <Route path='/' render={() => <div>404</div>} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
