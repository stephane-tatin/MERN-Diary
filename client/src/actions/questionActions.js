import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from "./types"
import axios from "axios"
import  questionsRandomizer  from "../utilities/questionsRandomizer"
import { tokenConfig, tokenConfigAndUserId } from "../actions/authActions"
import { returnErrors } from "./errorActions"

export const getQuestions = () => (dispatch, getState) => {
    dispatch(setQuestionsLoading());
    axios.get("/api/questions", tokenConfigAndUserId(getState))
    .then(res => 
        dispatch({
            type: GET_QUESTIONS,
            payload : res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const getRandomizedQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get("/api/questions")
    .then(res => 
        dispatch({
            type: GET_QUESTIONS,
            payload : questionsRandomizer(res.data)
        })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addQuestion = (question) => (dispatch, getState) => {
    axios.post("/api/questions", question, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: ADD_QUESTION,
            payload : res.data
        }))
}

export const deleteQuestion = (id) => (dispatch, getState) => {
    axios.delete(`/api/questions/${id}`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: DELETE_QUESTION,
            payload: id
        })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}



export const setQuestionsLoading = () => {
    return{
        type: QUESTIONS_LOADING,
    }
}
