import { GET_QUESTIONSFORMS, ADD_QUESTIONSFORM, DELETE_QUESTIONSFORM, QUESTIONSFORMS_LOADING } from "./types"
import axios from "axios"

export const getQuestionsForms = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get("/api/questionsForms")
    .then(res => 
        dispatch({
            type: GET_QUESTIONSFORMS,
            payload : res.data
        }))
}


export const addQuestionsForm = (questionsForm) => dispatch => {
    console.log("post")
    console.log(questionsForm)
    axios.post("/api/questionsForms", questionsForm)
    .then(res => 
        dispatch({
            type: ADD_QUESTIONSFORM,
            payload : res.data
        }))
}

export const deleteQuestion = (id) => dispatch => {
    axios.delete(`/api/questions/${id}`)
    .then((res) => {
        dispatch({
            type: DELETE_QUESTIONSFORM,
            payload: id
        })
    })
}



export const setQuestionsLoading = () => {
    return{
        type: QUESTIONSFORMS_LOADING,
    }
}
