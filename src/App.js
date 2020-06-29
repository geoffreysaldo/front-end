import React, { Component , useEffect} from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component'
import Plateau from './pages/plateau/plateau.component'
import NavBar from './components/nav-bar/nav-bar.component'
import Entree from './pages/entree/entree.component'
import Dessert from './pages/dessert/dessert.component'
import Boisson from './pages/boisson/boisson.component'
import Formule from './pages/formule/formule.component'
import Inscription from './pages/inscription/inscription.component'
import Compte from './pages/compte/compte.component';
import CompteValidation from './pages/compte_validation/CompteValidation.component';
import UpdatePassword from './pages/update-password/update_password.component';
import ModificationMdp from './pages/modification_mdp/modification_mdp.component';
import CommandValidation from './pages/CommandValidation/command_validation.component';
import Commande from './pages/commande/commande.component';
import Products from './pages/produits/products.component';
import Historique from './pages/historique/historique.component'; 
import Calendrier from './pages/calendrier/calendrier.component';
import Client from './pages/client/client.component';
import ClientHistorique from './pages/historique_client/historique_client.component';
import Zone from './pages/zone/zone.component';
import { ProtectedRoute } from './protected.route.component';
import { ProtectedRouteAdmin } from './protected_admin.route.component';



class App extends Component {

  constructor(props){
    super(props)


  }




  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/plateaux' component={Plateau}/>
        <Route exact path='/entree' component={Entree}/>
        <Route exact path='/dessert' component={Dessert}/>
        <Route exact path='/boisson' component={Boisson}/>
        <Route exact path='/formule' component={Formule}/>
        <Route exact path='/inscription' component={Inscription}/>
        <Route exact path='/update_password' component={UpdatePassword}/>
        <Route exact path='/validation_commande' component={CommandValidation}/>
        <Route exact path='/validation_compte/:key' component={CompteValidation}/>
        <Route exact path='/modification_mdp/:key' component={ModificationMdp}/>
        <ProtectedRouteAdmin exact path='/commandes' component={Commande}/>
        <ProtectedRouteAdmin exact path='/produits' component={Products}/>
        <ProtectedRouteAdmin exact path='/historique' component={Historique}/>
        <ProtectedRouteAdmin exact path='/calendrier' component={Calendrier}/>
        <ProtectedRouteAdmin exact path='/clients' component={Client}/>
        <ProtectedRouteAdmin exact path='/secteur' component={Zone}/>
        <ProtectedRoute exact path='/clients/:id' component={ClientHistorique}/>
        <ProtectedRoute exact path='/compte' component={Compte}/>
      </div>
    )
  }
}



export default App
