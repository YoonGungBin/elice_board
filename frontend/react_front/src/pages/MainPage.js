
import React,{useState} from 'react';
import "../components/style.css"
import BasicBar from '../components/BasicBar';
import BasicButton from '../components/Buttons/BasicButton';
import MostLiked from '../components/MostLiked';
import { useHistory } from 'react-router';
import MainPageSlider from '../components/Slider';
import store from '../redux_modules/user';

function MainPage(){
    const history = useHistory();
    return(
        <div >
            <BasicBar/>
            <div style={{minHeight: "40vh",display: "flex",flexDirection: "column", justifyContent:"center"}}>
                <MainPageSlider/>
                <div style={{ border: "solid 1px black" , display:"flex", justifyContent:"space-evenly"}}>
                    {store.getState().is_login ? <BasicButton value="글쓰기" url="/post/write"></BasicButton> : <BasicButton value="회원가입" url="/register"></BasicButton>}
                    <BasicButton value="전체게시판" url="/board"></BasicButton>
                </div>
           </div>
           <hr className ="Main-banner-Line"/>
           <div>
                <MostLiked data={[{ title: "flask", name: "eunsun", content:"오늘은 플라스크에 대해서 배워보려해요오늘은 플라스크에 대해서 배워보려해요오늘은 플라스크에 대해서 배워보려해요오늘은 플라스크에 대해서 배워보려해요".substring(0,30)+"..."},
                { title: "flask", name: "jongbin" },
                    { title: "flask", name: "jiyoon" }, { title: "flask", name: "eunsun" },
                    { title: "flask", name: "jongbin" },
                    { title: "flask", name: "jiyoon" }]} onClick={()=>history.push("/hi")}/>
           </div>
        </div>
    )
}

export default MainPage;
