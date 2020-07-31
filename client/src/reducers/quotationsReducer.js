import { GET_QUOTATIONS, QUOTATIONS_LOADING} from "../actions/types"


const initialState = {
    quotations : [],
    loading : false,
    loaded : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUOTATIONS:
            return {
                ...state,
                quotations : action.payload,
                loading : false,
                loaded : true
            }
        case QUOTATIONS_LOADING:
            return {
                ...state,
                loading : true
            }
        default:
            return state
    }
}