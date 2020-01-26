import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import { getProducts } from '../../services/api_service';


import { connect } from 'react-redux';

import { addCommandProduct } from '../../redux/command-products/command_products.actions'
import {setPokeBowls} from '../../redux/poke-bowls/poke_bowl.actions'

import './pokebowl.styles.scss'


import Button from '@material-ui/core/Button';

class PokeBowl extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    getProducts("poke").then(
      category => category[0].products.map(product => this.props.setPokeBowls(product))
    )
  }




    render() {
        return (
          <div className="page">
          <h1 className="title">
              PokeBowls
          </h1>
          <Paper className="paper">
          <GridList cols={3} className="grid">
          {
          this.props.pokeBowls.map((tile,index) =>
            (
            <GridListTile className="tile" style={{height:"300px",padding:"10px"}} key={index} >
              <h3 className="title">{tile.name}</h3>
              <Button onClick={() => this.props.addCommandProduct(tile.name)} >ajouter</Button>
            </GridListTile>
            ))}
          </GridList>
          </Paper>
          </div>
        )

      }
}
const mapStateToProps = state => ({
  pokeBowls : state.pokeBowls.pokeBowls
})


const mapDispatchedToProps = dispatch => ({
  addCommandProduct: product => dispatch(addCommandProduct(product)),
  setPokeBowls:products => dispatch(setPokeBowls(products))
})

export default connect(mapStateToProps,mapDispatchedToProps)(PokeBowl)
