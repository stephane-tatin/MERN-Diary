import { GET_QUESTIONSFORMS, ADD_QUESTIONSFORM, DELETE_QUESTIONSFORM, QUESTIONSFORMS_LOADING, CLEAR_QUESTIONSFORMS} from "../actions/types"

const initialState = {
    questionsForms : [],
    loading : false,
    loaded: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONSFORMS:
            return {
                ...state,
                questionsForms : action.payload,
                loading : false,
                loaded : true
            }
        case DELETE_QUESTIONSFORM:
            return {
                ...state,
                questions : state.questions.filter(question => question._id !== action.payload)
            }
        case ADD_QUESTIONSFORM:
            return {
                ...state,
                questionsForms: [action.payload, ...state.questionsForms]                
            }
        case QUESTIONSFORMS_LOADING:
            return {
                ...state,
                loading : true
            }
        case CLEAR_QUESTIONSFORMS:
            return {
                ...state,
                questionsForms : []
            }
        default:
            return state
    }
}