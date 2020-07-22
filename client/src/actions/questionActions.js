import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION } from "./types"

export const getQuestions = () => {
    return{
        type: GET_QUESTIONS
    }
}

export const deleteQuestion = (id) => {
    return{
        type: DELETE_QUESTION,
        payload : id
    }
}

export const addQuestion = (question) => {
    return{
        type: ADD_QUESTION,
        payload : question
    }
}
