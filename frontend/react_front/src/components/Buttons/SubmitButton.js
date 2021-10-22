import React from 'react';
import styled from "styled-components"

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

function SubmitButton({ value , onClick }) {
    return (

            <div style={{display:"flex"}}>
                <button style={{background: "transparent",border: "2px solid black",color: "black",margin: "0 1em",
  padding: "0.25em 1em",borderRadius: "50px",textAlign: "center"}}onClick={onClick} >{value}</button>
                </div>

  );
}

export default SubmitButton;
