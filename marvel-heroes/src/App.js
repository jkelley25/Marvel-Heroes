import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeroList from './components/HeroList';
import HeroPage from './components/HeroPage';

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <h1 className="title">Marvel Heroes</h1>
      </div>
      <div></div>
      <div className="components">
      <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ HeroList }/>
        <Route path='/hero/:id' exact component={ HeroPage } />
        <Route path='/' render={() => <div>404</div>} />
      </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
