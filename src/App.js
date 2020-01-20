import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component'
import NavBar from './components/nav-bar/nav-bar.component'
import PokeBowl from './pages/poke-bowl/pokebowl.component'
import Entree from './pages/entree/entree.component'
import Dessert from './pages/dessert/dessert.component'
import Boisson from './pages/boisson/boisson.component'
import Formule from './pages/formule/formule.component'

class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
      <NavBar/>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/pokebowl' component={PokeBowl}/>
        <Route exact path='/entree' component={Entree}/>
        <Route exact path='/dessert' component={Dessert}/>
        <Route exact path='/boisson' component={Boisson}/>
        <Route exact path='/formule' component={Formule}/>
      </div>
    )
  }
}



export default App
