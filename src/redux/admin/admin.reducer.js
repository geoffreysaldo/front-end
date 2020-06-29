
const INITIAL_STATE = {
    value : false
  }
  
  const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case 'SET_ADMIN':
        return {
          admin:action.payload
         }
      default:
        return state;
    }
  
  }
  
  export default adminReducer