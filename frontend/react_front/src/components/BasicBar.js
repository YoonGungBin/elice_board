import React, { useState } from 'react';
import "./style.css"
import { useHistory } from 'react-router';
import store from '../redux_modules/user';
import { logoutDB } from '../LoginValidation';

function BasicBar() {
    const history = useHistory()
    const loginstatus = store.getState().is_login
    return(
        <div>
            <header className="Basic-Bar">
                <div >
                    <div style={{ paddingLeft: "50px", fontSize:"30px"}} onClick={()=>history.push("/")}>ELICE BOARD</div></div>
                <div style={{display:"flex",justifyContent:"space-evenly", width:"50vh"}}>
                    {
                         loginstatus?
                        <div onClick={()=>logoutDB(history)}>로그아웃</div> :
                        <div onClick={()=>history.push("/login")}>로그인
                        </div>
                    }
                    
                <div onClick={()=>loginstatus?history.push("/mypage"):history.push("/login")}>마이페이지</div>
                <div onClick={()=>loginstatus?history.push("/post/write"):history.push("/login")}>글쓰기</div>
                </div>
            </header>
            <hr className="Main-banner-Line" />
        </div>
    );
}

export default BasicBar;
