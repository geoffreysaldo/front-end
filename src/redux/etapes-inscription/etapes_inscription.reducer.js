const INITIAL_STATE  = {
    etape : 1 
}

const etapeReducer = (state = INITIAL_STATE, action) =>  {
    switch(action.type){
        case 'SET_ETAPE':
            return {
                etape : action.payload
            }
        default:
            return state;
        }
    }

export default etapeReducer