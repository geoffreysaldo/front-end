import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';

import './pokebowl.styles.scss'
import { FormHelperText } from '@material-ui/core';

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
            </GridListTile>
            ))
          }
          </GridList>
          </Paper>
          </div>
        )

      }
}

export default PokeBowl