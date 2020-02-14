import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HeroList from './components/hero-list/HeroList';
import HeroPage from './components/hero-page/HeroPage';
import logo from './logo.png';
import IosHome from 'react-ionicons/lib/IosHome';
import IosSearch from 'react-ionicons/lib/IosSearch';
import HomePage from './pages/HomePage';

function App() {


  return (
    <div className="App">
      <div className="nav-bar">
        <div  className="nav-icons">
          <Link to='/'> 
            <IosHome className="home-button" fontSize="50px" color="red"/>
          </Link>
          <Link to='/search'>
            <IosSearch fontSize="50px" color="red"/>
          </Link>
        </div>
        <img className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} src={logo}></img>
      </div>
      <div className="overview">
        <h1>Explore The Marvel Universe </h1>
      </div>
        <Switch>
          <Route path='/' exact component={ HomePage }/>
          <Route path='/search' exact component={ HeroList } />
          <Route path='/hero/:id/:offset/' exact component={ HeroPage } />
          <Route path='/' render={() => <div>404</div>} />
        </Switch>
    </div>
  );
}

export default App;
