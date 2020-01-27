const INITIAL_STATE = {
    pokeBowls : []
  }
  
  const pokeBowlsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_POKE_BOWLS':
        return {
          ...state,
          pokeBowls: [...state.pokeBowls,action.payload]
         }
      case 'RESET_POKE_BOWLS':
        return {
          pokeBowls : []
         }
      default:
        return state;
    }
  
  }
  
  export default pokeBowlsReducer