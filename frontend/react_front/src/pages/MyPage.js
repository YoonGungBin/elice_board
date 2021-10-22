
import React, { useState } from 'react';
import styled from 'styled-components';
import "../components/style.css"
import BasicBar from '../components/BasicBar';
import { useHistory } from 'react-router';
import { useRef } from 'react';
import SubmitButton from '../components/Buttons/SubmitButton';
import InputSubmitButton from '../components/Buttons/InputSubmitButton';
function MyPage() {
    
    const [loginstatus, setLogin] = useState(false);
    // const [logoLoading, setLogoLoading] = useState(false);

    const [imgBase64, setImgBase64] = useState(null)
    const [imgFile, setImgFile] = useState(null);

    const LogoImgBox = styled.div`
    width:40vh;
    border: solid 10px gray;
    height: 40vh;
    `
    const history = useHistory()
    const logoImgInput = useRef();

    const onImgInputBtnClick = (e) => {
        e.preventDefault();
        logoImgInput.current.click();
    }
    const handleChangeFile = (e) => {
        console.log(e.target.files[0])
        setImgFile(e.target.files[0])
        setImgBase64([]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            const base64 = reader.result;
            console.log(base64);
            if (base64) {
                var base64Sub = base64.toString()
                setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
            }
        }
    }

    const onClearImg = (e) => {
        e.preventDefault();
        setImgBase64(null);
        setImgFile(null);

    }
    const nicknameRef = useRef();
    const [nickname, setNickname] = useState("")
    const handleNickname = (e) => {
        setNickname(nicknameRef.current.value)
        console.log(nickname);
    }

    return (
        <div >
            <BasicBar />
            <div style={{
                display: "flex", justifyContent:"space-around" , height: "50vh", alignItems: "center"
            }}>
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: "center",justifyContent:"space-between",
                width: "45vh", height:"45vh",marginLeft: "10vh", marginTop: "10vh"
            }}>
                {imgBase64 ? <img src={imgBase64} alt="img" width="40vh" height="40vh"/>: <LogoImgBox><div>50KB 이하의 사진을 업로드하세요</div></LogoImgBox>}
                <input ref={logoImgInput} type="file" accept="image/*" name="file" style={{ display: 'none' }} onChange={handleChangeFile}/>
                <div style={{display:"flex"}}>  
                    <SubmitButton value="사진 업로드" onClick={onImgInputBtnClick} />
                    <SubmitButton value="사진 삭제" onClick={onClearImg}/>
               </div>
                </div>
                <div>
                    <div><InputSubmitButton value="EDIT" button={true} label="별명 : " principle="/^[a-zA-Z0-9]/" principlename="별명"/></div>
                    <div><InputSubmitButton type="password" button={false} label="비밀번호 변경 : " principle="" onClick={() => { }}/></div>
                    <div><InputSubmitButton type="password" button={true} value="EDIT" label="비밀번호 확인 : " principle="" onClick={()=>{}}/></div>


            </div>
            </div>

        </div>
    )
}

export default MyPage;
