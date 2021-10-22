import React from 'react';
import styled from "styled-components"


const Container = styled.div`
text-align: center;
`

function EditButton({ OnClick }) {

    return (
        <Container>
                <button style={{
                background: "transparent", border: "2px solid black", color: "black", margin: "0 1em",
                padding: "0.25em 1em", borderRadius: "50px", textAlign: "center"
            }} onClick = {OnClick}>EDIT</button>
        </Container>

  );
}

export default EditButton;
