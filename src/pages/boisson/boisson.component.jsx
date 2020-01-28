import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { getProducts } from '../../services/api_service';


import { connect } from 'react-redux';

import { addCommandProduct } from '../../redux/command-products/command_products.actions'
import {setBoissons, resetBoissons} from '../../redux/boissons/boisson.actions'

import './boisson.styles.scss'

class Boisson extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.resetBoissons()
    getProducts("boisson").then(
      category => category[0].products.map(product => this.props.setBoissons(product))
    )
  }

    

    
    render() {
      return (
        <div className="page">
        <h1 className="title">
          Boissons
        </h1>
        <Paper className="paper">
        <GridList cols={3} className="grid" >
          {
        this.props.boissons.map((tile,index) =>
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
  boissons : state.boissons.boissons
})


const mapDispatchedToProps = dispatch => ({
  addCommandProduct: product => dispatch(addCommandProduct(product)),
  setBoissons:products => dispatch(setBoissons(products)),
  resetBoissons:() => dispatch(resetBoissons())

}) 
export default connect(mapStateToProps,mapDispatchedToProps)(Boisson)
