import React from "react";
import styled from "styled-components";
import { Link, NavLink, withRouter } from "react-router-dom";

import { Logo, Container } from "../Header/Header";

const FooterContainer = styled(Container)`
	flex-direction: column;
	justify-content: center;
	padding: 2.5em 1em;
	font-size: .8rem;
	color: rgba(255, 255, 255, 0.30);
`;

const Footer = () => {
  return (
    <footer>
      <FooterContainer>
        <p>This site was made by educational purposes only</p>
        <p>Please, contact me if you have some suggestions or questions</p>
      </FooterContainer>
    </footer>
  );
};

export default withRouter(Footer);
