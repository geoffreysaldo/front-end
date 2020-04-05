const INITIAL_STATE = {
    password : ''
  }

  const passwordReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_PASSWORD':
            return {
                password: action.payload
            }
        default:
            return state
      }
  }

  export default passwordReducer