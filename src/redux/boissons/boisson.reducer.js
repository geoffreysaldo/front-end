const INITIAL_STATE = {
    boissons : []
  }
  
  const boissonsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_BOISSONS':
        return {
          ...state,
          boissons: [...state.boissons,action.payload]
         }
      case 'RESET_BOISSONS':
        return {
          boissons : []
         }
      default:
        return state;
    }
  
  }
  
  export default boissonsReducer