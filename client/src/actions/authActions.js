import axios from "axios"

import {USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from "../actions/types"

import { returnErrors } from "./errorActions"

//Check token and load user
export const loadUser = ()=> (dispatch, getState) => {
    // User Loading
    dispatch({ type : USER_LOADING})



    axios.get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({
        type : USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({ type : AUTH_ERROR})
    })
}

//Register User
export const register = (newUser) => dispatch => {
    //Headers
    const config = {
        "Content-Type" : "application/json"
    }
    
    // //Request Body


    axios.post("/api/users", newUser, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, "REGISTER_FAIL"))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//login user

export const login = (user) => dispatch => {
    //Headers
    const config = {
        "Content-Type" : "application/json"
    }
    
    // //Request Body


    axios.post("/api/auth", user, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, "LOGIN_FAIL"))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//logout user 

export const logout = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}

//Setup Config /headers and token 

export const tokenConfig = getState => {
        //Get Token from localStorage
        const token = getState().authReducer.token
      

        // Set Headers
        const config = {
            headers: {
                "Content-type" : "application/json"
            }
        }
    
        // If Token, add to headers
        if(token) {
            config.headers["x-auth-token"] = token;
        }
        return config
}

//Setup Config /headers and token 

export const tokenConfigAndUserId = getState => {
    //Get Token from localStorage
    const token = getState().authReducer.token
    const userId = getState().authReducer.user._id
  
    console.log(userId)

    // Set Headers
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }

    // If Token, add to headers
    if(token) {
        config.headers["x-auth-token"] = token;
        config.headers["userId"] = userId;
    }
    return config
}