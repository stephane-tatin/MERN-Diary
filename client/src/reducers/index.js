import  { combineReducers } from "redux"
import questionReducer from "./questionReducer"
import questionsFormReducer from "./questionsFormReducer"

export default combineReducers({
    question: questionReducer,
    questionsForm : questionsFormReducer
})