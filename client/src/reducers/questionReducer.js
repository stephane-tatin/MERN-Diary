import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING} from "../actions/types"
import questionsRandomizer from "../utilities/questionsRandomizer"

const initialState = {
    questions : [],
    randomizedQuestions: [],
    loading : false,
    loaded : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions : action.payload,
                randomizedQuestions : questionsRandomizer(action.payload),
                loading : false,
                loaded : true
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions : state.questions.filter(question => question._id !== action.payload)
            }
        case ADD_QUESTION:
            return {
                ...state,
                questions: [action.payload, ...state.questions]
            }
        case QUESTIONS_LOADING:
            return {
                ...state,
                loading : true
            }
        default:
            return state
    }
}