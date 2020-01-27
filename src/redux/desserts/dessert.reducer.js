const INITIAL_STATE = {
    desserts : []
  }
  
  const dessertReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_DESSERT':
        return {
          ...state,
          desserts: [...state.desserts,action.payload]
         }
      case 'RESET_DESSERT':
        return {
            desserts : []
        }
      default:
        return state;
    }
  
  }
  
  export default dessertReducer