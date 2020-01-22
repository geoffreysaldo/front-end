import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';

import { addCommandProduct } from '../../redux/command-products/command_products.actions'

import './pokebowl.styles.scss'


import Button from '@material-ui/core/Button';

class PokeBowl extends Component {
  constructor(props){
    super(props)
  }
    
  pokebowl = [{"id":1,
               "name":"Saumon classique",
               "image":"image saumon",
               "prix":10.90,
              },
              {
               "id":2,
               "name":"Thon classique",
               "image":"image thon",
               "prix":11.90,
              },
              {
               "id":3,
               "name":"dorade classique",
               "image":"image dorade",
               "prix":10.90,
              },
              {"id":4,
              "name":"Saumon classique",
              "image":"image saumon",
              "prix":10.90,
             },
             {
              "id":5,
              "name":"Thon classique",
              "image":"image thon",
              "prix":11.90,
             },
             {
              "id":6,
              "name":"dorade classique",
              "image":"image dorade",
              "prix":10.90,
             }]
    
    
    
    
    
    
    
    
    render() {
        return (
          <div className="page">
          <h1 className="title">
              PokeBowls
          </h1>
          <Paper className="paper">
          <GridList cols={3} >
          {
          this.pokebowl.map(tile => 
            (
            <GridListTile style={{height:"300px",padding:"10px"}} key={tile.id} >
              <h3 className="productTitle">{tile.name}</h3>
              <Button onClick={() => this.props.addCommandProduct(tile.name)}>ajouter produit</Button>
            </GridListTile>
            ))
          }
          </GridList>
          </Paper>
          </div>
        )

      }
}


const mapDispatchedToProps = dispatch => ({
  addCommandProduct: product => dispatch(addCommandProduct(product)),
})

export default connect(null,mapDispatchedToProps)(PokeBowl)