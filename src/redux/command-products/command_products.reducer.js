import { addItemToCommand, deleteItemToCommand, removeItemToCommand } from './command_products.utils'


const INITIAL_STATE = {
    commandProducts : []
  }

  const commandProductsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'ADD_COMMAND_PRODUCT':
        return {
          ...state,
          commandProducts: addItemToCommand(state.commandProducts,action.payload)
         }
      case 'DELETE_COMMAND_PRODUCT':
        return {
          ...state,
          commandProducts: deleteItemToCommand(state.commandProducts,action.payload)
        }
      case 'REMOVE_COMMAND_PRODUCT':
        return {
          ...state,
          commandProducts: removeItemToCommand(state.commandProducts,action.payload)
          }
      default:
        return state;
    }

  }

  export default commandProductsReducer
