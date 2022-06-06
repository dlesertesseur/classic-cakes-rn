import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_SIGNUP_URL } from "../../Constants/firebase";
import { LOGIN_URL } from "../../Constants/firebase";
import { stringTable } from "../../Styles/StringTable";

const initialState = {
    value: {
        user: {
            userId: "",
            email: "",
            token: ""
        },
        loading: false,
        error: "",
    }
}

/********************************************************/
/** Pasar a .env ****************************************/
/********************************************************/
const API_KEY = 'AIzaSyAEsCthdW0JiO3U8R5tBaMpnQVvcJK9ddY';
/********************************************************/

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (parameters, asyncThunk) => {
        try {
           const res = await fetch (`${AUTH_SIGNUP_URL + API_KEY}`, {
               method: 'POST',
               body: JSON.stringify({
                   email: parameters.email,
                   password: parameters.password,
                   returnSecureToken: true,
               })
           });
           const data = await res.json()
           return data
        } catch (error) {
            return rejectWithValue(stringTable.SIGNUP_ERROR)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (parameters, asyncThunk) => {
        try {
           const res = await fetch (`${LOGIN_URL + API_KEY}`, {
               method: 'POST',
               body: JSON.stringify({
                   email: parameters.email,
                   password: parameters.password,
                   returnSecureToken: true,
               })
           });
           const data = await res.json()
           return data
        } catch (error) {
            return rejectWithValue(stringTable.LOGIN_ERROR)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthData: () => initialState
    },
    extraReducers: {
        //SIGNUP
        [signUp.pending]: (state) => {
            state.value.loading = true
        },
        [signUp.fulfilled]: (state, {payload}) => {
            if (payload.error) {
                state.value.error = payload.error.message
            }
            state.value.loading = false
            
            state.value.user.userId = payload.localId
            state.value.user.email = payload.email
            state.value.user.token = payload.idToken
        },
        [signUp.rejected]: (state) => {
            state.value.loading = false
            state.value.error = stringTable.SIGNUP_ERROR
        },
        
        //LOGIN
        [login.pending]: (state) => {
            state.value.loading = true
        },
        [login.fulfilled]: (state, {payload}) => {
            if (payload.error) {
                state.value.error = payload.error.message
            }
            state.value.loading = false
            
            state.value.user.userId = payload.localId
            state.value.user.email = payload.email
            state.value.user.token = payload.idToken
        },
        [login.rejected]: (state) => {
            state.value.loading = false
            state.value.error = stringTable.LOGIN_ERROR
        }

    }
})

export const {resetAuthData} = authSlice.actions;

export default authSlice.reducer;