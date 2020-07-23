import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from "./types"
import axios from "axios"
import  questionsRandomizer  from "../utilities/questionsRandomizer"

export const getQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get("/api/questions")
    .then(res => 
        dispatch({
            type: GET_QUESTIONS,
            payload : res.data
        }))
}

export const getRandomizedQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get("/api/questions")
    .then(res => 
        dispatch({
            type: GET_QUESTIONS,
            payload : questionsRandomizer(res.data)
        }))
}

export const addQuestion = (question) => dispatch => {
    axios.post("/api/questions", question)
    .then(res => 
        dispatch({
            type: ADD_QUESTION,
            payload : res.data
        }))
}

export const deleteQuestion = (id) => dispatch => {
    axios.delete(`/api/questions/${id}`)
    .then((res) => {
        dispatch({
            type: DELETE_QUESTION,
            payload: id
        })
    })
}



export const setQuestionsLoading = () => {
    return{
        type: QUESTIONS_LOADING,
    }
}
