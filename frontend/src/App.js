
import './App.css';
import React from "react";
// /https://reactrouter.com/web/example/basic/ react-router-dom을  참고하는 사이트 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import Write from './pages/Write'
import SignupForm from './pages/SignUp';
//import RegisterPage from './components/views/RegisterPage/RegisterPage';
import store from "./redux_modules/user"
import { Provider } from "react-redux";
import {getCookie} from "./Cookie"
import {loginCheckDB} from "./LoginValidation"

axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.withCredentials = true;

function App() {
  
  useEffect(() => {
    if (getCookie("is_login")) {
      store.dispatch(loginCheckDB);
    }
  })
  return (
    <Provider store={store}>
      <Router>
      <div>
        <Switch>
          <Route exact path="/" component = {MainPage} /> 
          <Route path="/login" >
            <LoginPage />
          </Route>
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/post/write" component={Write} />
          <Route exact path="/register" component={SignupForm} />

        </Switch>
      </div>
      </Router>
      </Provider>
    
  );
}
export default App;
