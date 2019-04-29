import React from "react";
import styled from "styled-components";
import { Link, NavLink, withRouter } from "react-router-dom";

import { Logo, Container } from "../Header/Header";

const FooterContainer = styled(Container)`
  justify-content: center;
`;

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <FooterContainer>
        <Logo as={Link} to="/">
          vinyl
        </Logo>
      </FooterContainer>
    </footer>
  );
};

export default withRouter(Footer);
