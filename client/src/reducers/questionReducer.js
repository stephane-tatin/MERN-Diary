import uuid from "uuid/dist/v1"
import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION} from "../actions/types"

const initialState = {
    questions : [
        {id : uuid(), wording: "How do you feel today ?"},
        {id : uuid(), wording: "How could you be nicer to yourself ?"},
        {id : uuid(), wording: "Where would you rather be ?"},
        {id : uuid(), wording: "Who would you like to be with ?"},
        {id : uuid(), wording: "What would you like to achieve ?"},
   
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions : state.questions.filter(question => question.id !== action.payload)
            }
        case ADD_QUESTION:
            return {
                ...state,
                questions: [action.payload, ...state.questions]
            }
        default:
            return state
    }
}