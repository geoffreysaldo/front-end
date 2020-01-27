const INITIAL_STATE = {
    entrees : []
  }
  
  const entreeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_ENTREE':
        return {
          ...state,
          entrees: [...state.entrees,action.payload]
         }
      case 'RESET_ENTREE':
        return {
          entrees : []
        }
      default:
        return state;
    }
  
  }
  
  export default entreeReducer