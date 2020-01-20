import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import HomePage from './pages/homepage.component'
import NavBar from './components/nav-bar/nav-bar.component'

class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/nav' component={NavBar}/>
      </div>
    )
  }
}



export default App
