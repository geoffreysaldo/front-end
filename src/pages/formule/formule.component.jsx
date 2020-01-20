import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';

class Formule extends Component {
    
    
  constructor(props){
    super(props)
  }
    
    
    
    
  formules = [{"id":1,
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
        <h1>
          Formules
        </h1>
        <Paper className="paper">
        <GridList cols={3} >
        {
        this.formules.map(tile => 
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

export default Formule