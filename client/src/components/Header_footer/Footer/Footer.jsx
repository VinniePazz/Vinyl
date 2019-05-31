import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Container } from "../Header/Header";

import FacebookIcon from "../../icons/FacebookIcon";
import GithubIcon from "../../icons/GithubIcon";
import LinkedinIcon from "../../icons/LinkedinIcon";

const FooterContainer = styled(Container)`
  flex-direction: column;
  justify-content: center;
  padding: 2.5em 1em;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
	text-align: center;

	@media (max-width: 500px) {
		font-size: 1rem;
	}
`;

const LinkBar = styled.ul`
  margin-top: 1em;

  a {
    margin: 0 0.5em;
  }
`;

const Footer = () => {
  return (
    <footer>
      <FooterContainer>
        <p>This site was made by educational purposes only</p>
        <p>Please, contact me if you have some suggestions or questions</p>
        <LinkBar>
          <a
            href="https://www.facebook.com/profile.php?id=100013179880450"
            target="blank"
          >
            <FacebookIcon />
          </a>
          <a href="https://github.com/VinniePazz" target="blank">
            <GithubIcon />
          </a>
          <a href="#">
            <LinkedinIcon />
          </a>
        </LinkBar>
      </FooterContainer>
    </footer>
  );
};

export default withRouter(Footer);
