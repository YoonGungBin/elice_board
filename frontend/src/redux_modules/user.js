import axios from "axios";
import {configureStore,createSlice} from "@reduxjs/toolkit"
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { onLoginSuccess } from "../LoginValidation";
import { setCookie, getCookie , deleteCookie} from "../Cookie";



const Login = createSlice({
    name: "LoginReducer",
    initialState: { user: false, is_login: false },
    reducers: {
        login: (state, action) => {
            return {user:action.payload.id,is_login:true}
        },
        logout: () => {
            deleteCookie("is_login")
            return { user: false, is_login: false };
        },
    }
})

const store = configureStore({ reducer: Login.reducer })

export const {
    login, logout
} = Login.actions;


export default store;

