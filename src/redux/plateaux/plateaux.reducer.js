const INITIAL_STATE = {
    plateaux : []
  }
  
  const plateauxReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_PLATEAUX':
        return {
          ...state,
          plateaux: [...state.plateaux,action.payload]
         }
      case 'RESET_PLATEAUX':
        return {
          plateaux : []
         }
      default:
        return state;
    }
  
  }
  
  export default plateauxReducer;