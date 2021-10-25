import React from 'react';
import styled from 'styled-components';
import "./style.css"
const OuterBox = styled.div`
    min-height: 47vh;
    max-width: 200vh;
    border-radius: 4vw;
    border: solid 1px black;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    align-items: center; /* 수직 가운데 정렬 */
    justify-content: center;

    
`
const InnerBox = styled.div`

    
    border: solid 1px black;
    max-width: 50vh;
    max-height: 20vh;
    margin-left: 1vh;
    margin-top: 2vh;
    border-radius: 10px;
    min-height: 20vh;
    min-width: 40vh;
    
`
const Title = styled.div`
    display: flex;
    align-items: center;
`;
const Contents = styled.div`
    padding:20px;
    min-width:10vh;
`

function MostLiked({data, onClick}) {
    return (
        <OuterBox>

                {data.map((datum, index) => (
                    <div onClick={onClick}>
                        <InnerBox>
                            <Title>
                            <Contents>{index + 1}</Contents>
                            <Contents>{datum.title}</Contents>
                            <Contents>{datum.name}</Contents>
                            </Title>
                            <Contents>{datum.content}</Contents>
                        </InnerBox>
                    </div>))}

        </OuterBox>
    );
}

export default MostLiked;
