import React from 'react';
import styled from "styled-components"
import { useHistory } from 'react-router';

const Button = styled.button`
background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  border-radius: 50px;
`
const Container = styled.div`
text-align: center;
`

function BasicButton({ value, url }) {
    const history=useHistory()
    return (
        <Container>
            <div onClick={()=>history.push(url)}>
                <Button>{value}</Button>
                </div>
        </Container>

  );
}

export default BasicButton;
