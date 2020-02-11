import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeroList from './components/hero-list/HeroList';
import HeroPage from './components/hero-page/HeroPage';
import logo from './logo.png';
import marvelBackground  from './Marvel_Characters.png';
import IosHome from 'react-ionicons/lib/IosHome';

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <IosHome className="home" fontSize="50px" color="red" />
        <img className="logo" src={logo}></img>
      </div>
      <div className="overview">
        <img src={marvelBackground}></img>
        <h1>Discover Heroes and Villains</h1>
      </div>
      <div></div>
      <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ HeroList }/>
        <Route path='/hero/:id/:offset/' exact component={ HeroPage } />
        <Route path='/' render={() => <div>404</div>} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
