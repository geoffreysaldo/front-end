const INITIAL_STATE = {
    commandProducts : []
  }
  
  const commandProductsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'ADD_COMMAND_PRODUCT':
        return {
          ...state,
          commandProducts: [...state.commandProducts,action.payload]
         }
      default:
        return state;
    }
  
  }
  
  export default commandProductsReducer