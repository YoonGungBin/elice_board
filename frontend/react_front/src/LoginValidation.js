import axios from "axios";
import { checkPropTypes } from "prop-types";
import React from "react";
import { useHistory } from "react-router";
import { getCookie, setCookie,deleteCookie } from "./Cookie";
import store from "./redux_modules/user";
import { login, logout } from "./redux_modules/user";
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

const loginDB = (values,history) => {
    
    axios({
        method: "post",
        url: "/login",
        data: values,
    })
        .then((res) => {
            if (onLoginSuccess(res)) {
                console.log("yes")
                store.dispatch(
                    login({
                        id: values.id,
                    })
                );
                history.replace("/")
            }
        })
        .catch(error => {
            alert("2", error)
        })
    };
    



const logoutDB = (history) => {
    store.dispatch(logout());
    history.replace("/");
    deleteCookie("is_login")


};

const loginCheckDB = () => {
    const token = getCookie("is_login");
    console.log(token);
    axios({
      method: "post",
      url: "/check",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        store.dispatch(
          login({
            id: res.data.id,
            name: res.data.name,
          })
        );
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };


const onSilentRefresh = (refreshToken) => {
    axios.post('/silent-refresh', refreshToken)
        .then((res)=>onLoginSuccess(res))
        .catch(error => {
            alert(error)
        });
}

const onLoginSuccess = response => {
    if (response.status === 401) {
        return false;
    }
    console.log(response);
    const  accessToken  = response.data.accessToken;
    // accessToken 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setCookie("is_login", accessToken)
    // accessToken 만료하기 1분 전에 로그인 연장
    const refreshToken = document.cookie;
    setTimeout(onSilentRefresh(refreshToken), JWT_EXPIRY_TIME - 60000);
    return true;
}

export {  onSilentRefresh, onLoginSuccess , loginDB, logoutDB, loginCheckDB};