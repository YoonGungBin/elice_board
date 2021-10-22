import React, { useState } from 'react';
import styled from "styled-components"
import { useRef, useEffect } from 'react';
import EditButton from './EditButton';
const Button = styled.button`
background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  border-radius: 50px;
  text-align: center;
`

function InputSubmitButton({ label, value , principle,principlename, type,button}) {
    const Inputref = useRef();
    const [inputvalue, setInputValue] = useState("")
    const [rightprinciple,setRightPrinciple] = useState(false)
    const handleButton = (e) => {
        e.preventDefault();
        setInputValue(Inputref.current.value)
        console.log(inputvalue)
    }
        const handleInput = (e) => {
            setInputValue(e.target.value)
            inputvalue == inputvalue.replace(principle, "")?setRightPrinciple(true):setRightPrinciple(false)
        }
    useEffect(() => {
        handleInput;
        
    },[inputvalue])
    
    return (

        <div style={{display:"flex", marginRight:"30vh",width:"100vh",justifyContent:"center"}}>
            <label style={{display:"block", width:"20vh"}}>{label}</label>
            <input type={type} ref={Inputref} value={inputvalue} onChange={handleInput}
                style={inputvalue ? { width: "40vh", marginBottom: "1vh", backgroundColor: "white" } : { width: "40vh", marginBottom: "1vh", backgroundColor: "gray" }} />
            <span style={{ color: "red" , width:"20vh"}}>{rightprinciple? button?<EditButton/>:"":`올바른 ${principlename}을 작성하세요.`}</span>
                </div>

  );
}

export default InputSubmitButton;
