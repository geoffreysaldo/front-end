const INITIAL_STATE = {
    informations : ''
}

const informationInscriptionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_INFORMATION_INSCRIPTION':
            return{
                informations : action.payload
            }
        default:
            return state;
    }
}

export default informationInscriptionReducer;