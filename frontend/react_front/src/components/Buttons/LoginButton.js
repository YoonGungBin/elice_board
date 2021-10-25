import { Login } from "@styled-icons/entypo";
import propTypes from "prop-types";
import{Link} from "react-router-dom";
import styled from "styled-components";
import React from "react";
import {LgShared} from "./LgShared"


const LgButtons = styled(LgShared)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;


function LoginButton({cta, link, linkText}){
    return(
        <LgButtons>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </LgButtons>
    );
}

LoginButton.propTypes = {
    cta : propTypes.string.isRequired,
    link : propTypes.string.isRequired,
    linkText : propTypes.string.isRequired,
};

export default LoginButton;