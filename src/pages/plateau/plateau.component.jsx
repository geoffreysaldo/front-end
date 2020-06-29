import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import { getProducts } from '../../services/api_service';

import { connect } from 'react-redux';
import { addCommandProduct } from '../../redux/command-products/command_products.actions'
import { setPlateaux, resetPlateaux } from '../../redux/plateaux/plateaux.actions'
import Button from '@material-ui/core/Button';


class Plateau extends Component { 
    constructor(props){
      super(props)
    }
  
    componentDidMount(){
      this.props.resetPlateaux()
      getProducts("plateaux").then(
        products => products.map(product => this.props.setPlateaux(product))
      )
    }
      
      
      render() {
        return (
          <div className="page">
          <h1 className="title">
            Plateaux
          </h1>
          <Paper className="paper">
          <GridList cols={3} className="grid">
          {
            this.props.plateaux.map((tile,index) =>
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
    plateaux : state.plateaux.plateaux
  })
  
  
  const mapDispatchedToProps = dispatch => ({
    addCommandProduct: product => dispatch(addCommandProduct(product)),
    setPlateaux:products => dispatch(setPlateaux(products)),
    resetPlateaux: () => dispatch(resetPlateaux())
  })
  
  export default connect(mapStateToProps,mapDispatchedToProps)(Plateau)