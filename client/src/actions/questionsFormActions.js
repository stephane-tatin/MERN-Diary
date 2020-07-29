import { GET_QUESTIONSFORMS, ADD_QUESTIONSFORM, DELETE_QUESTIONSFORM, QUESTIONSFORMS_LOADING, ADD_QUESTIONSFORM_ERROR } from "./types"
import axios from "axios"
import { tokenConfigAndUserId } from "./authActions"
import { returnErrors } from "./errorActions"


export const getQuestionsForms = () => (dispatch, getState) => {
    dispatch(setQuestionsLoading());
    axios.get("/api/questionsForms", tokenConfigAndUserId(getState))
    .then(res => 
        dispatch({
            type: GET_QUESTIONSFORMS,
            payload : res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


export const addQuestionsForm = (questionsForm) => dispatch => {
    axios.post("/api/questionsForms", questionsForm)
    .then(res => 
        dispatch({
            type: ADD_QUESTIONSFORM,
            payload : res.data
        })).catch(err => {
            dispatch(returnErrors(err.response.data, "ADD_QUESTIONSFORM_ERROR"))
            dispatch({ type : ADD_QUESTIONSFORM_ERROR})
        })
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
