import { QUOTATIONS_LOADING, GET_QUOTATIONS} from "./types"
import axios from "axios"
import { tokenConfig } from "./authActions"
import { returnErrors } from "./errorActions"

export const getQuotations = () => (dispatch, getState) => {
    dispatch(setQuotationsLoading());
    axios.get("/api/quotations", tokenConfig(getState))
    .then(res => 
        dispatch({
            type: GET_QUOTATIONS,
            payload : res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}



export const setQuotationsLoading = () => {
    return{
        type: QUOTATIONS_LOADING,
    }
}
