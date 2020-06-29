import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import { getProducts } from '../../services/api_service';

import { connect } from 'react-redux';
import { addCommandProduct } from '../../redux/command-products/command_products.actions'
import { setEntrees } from '../../redux/entrees/entree.actions'
import { resetEntrees } from '../../redux/entrees/entree.actions'



import Button from '@material-ui/core/Button';
class Entree extends Component { 
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.resetEntrees()
    getProducts("entree").then(
      products => products.map(product => this.props.setEntrees(product))
    )
  }
    
    
    render() {
      return (
        <div className="page">
        <h1 className="title">
          Entrées
        </h1>
        <Paper className="paper">
        <GridList cols={3} className="grid">
        {
          this.props.entrees.map((tile,index) =>
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
  entrees : state.entrees.entrees
})


const mapDispatchedToProps = dispatch => ({
  addCommandProduct: product => dispatch(addCommandProduct(product)),
  setEntrees:products => dispatch(setEntrees(products)),
  resetEntrees: () => dispatch(resetEntrees())
})

export default connect(mapStateToProps,mapDispatchedToProps)(Entree)