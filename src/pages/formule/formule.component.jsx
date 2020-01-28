import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { getProducts } from '../../services/api_service';


import { connect } from 'react-redux';

import { addCommandProduct } from '../../redux/command-products/command_products.actions'
import {setFormules, resetFormules} from '../../redux/formules/formule.actions'

import './formule.styles.scss'

class Formule extends Component {
    
    
  constructor(props){
    super(props)
  }
    
  componentDidMount(){
    this.props.resetFormules()
    getProducts("formule").then(
      category => category[0].products.map(product => this.props.setFormules(product))
    )
  }
    
    
    

    
    
    render() {
      return (
        <div className="page">
        <h1 className="title">
          Formules
        </h1>
        <Paper className="paper" >
        <GridList cols={3} className="grid">
        {
          this.props.formules.map((tile,index) =>
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
  formules : state.formules.formules
})


const mapDispatchedToProps = dispatch => ({
  addCommandProduct: product => dispatch(addCommandProduct(product)),
  setFormules:products => dispatch(setFormules(products)),
  resetFormules:() => dispatch(resetFormules())

})

export default connect(mapStateToProps,mapDispatchedToProps)(Formule)