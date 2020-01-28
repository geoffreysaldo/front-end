const INITIAL_STATE = {
    formules : []
  }
  
  const formulesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_FORMULES':
        return {
          ...state,
          formules: [...state.formules,action.payload]
         }
      case 'RESET_FORMULES':
        return {
          formules : []
         }
      default:
        return state;
    }
  
  }
  
  export default formulesReducer