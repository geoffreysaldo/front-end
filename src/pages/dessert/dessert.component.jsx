import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import { getProducts } from '../../services/api_service';

import { connect } from 'react-redux';

import { addCommandProduct } from '../../redux/command-products/command_products.actions'
import {setDesserts,resetDesserts} from '../../redux/desserts/dessert.actions'

import './dessert.styles.scss'


import Button from '@material-ui/core/Button';
class Dessert extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.resetDesserts()
    getProducts("desserts").then(
      category => category[0].products.map(product => this.props.setDesserts(product))
    )
  }
    
    
    render() {
      return (
        <div className="page">
        <h1 className="title">
            Désserts
        </h1>
        <Paper className="paper"  >
        <GridList cols={3} className="grid">
        {
          this.props.desserts.map((tile,index) =>
            (
            <GridListTile className="tile" style={{height:"300px",padding:"10px"}} key={index} >
              <h3 className="title">{tile.name}</h3>
              <Button onClick={() => this.props.addCommandProduct({name: tile.name, price : tile.price})} >ajouter</Button>
            </GridListTile>
            ))}
        </GridList>
        </Paper>
        </div>
      )
    }
}

const mapStateToProps = state => ({
  desserts : state.desserts.desserts
})


const mapDispatchedToProps = dispatch => ({
  addCommandProduct: product => dispatch(addCommandProduct(product)),
  setDesserts: products => dispatch(setDesserts(products)),
  resetDesserts:() => dispatch(resetDesserts())

})

export default connect(mapStateToProps,mapDispatchedToProps)(Dessert)