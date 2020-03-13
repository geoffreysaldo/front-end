const INITIAL_STATE = {
    email : ''
  }

  const emailReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_EMAIL':
            return {
                email: action.payload
            }
        default:
            return state
      }
  }

  export default emailReducer