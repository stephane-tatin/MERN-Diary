import  { combineReducers } from "redux"
import questionReducer from "./questionReducer"
import questionsFormReducer from "./questionsFormReducer"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"

export default combineReducers({
    question: questionReducer,
    questionsForm : questionsFormReducer,
    errorReducer : errorReducer,
    authReducer: authReducer
})