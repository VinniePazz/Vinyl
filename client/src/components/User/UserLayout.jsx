import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import AccountIcon from "../icons/AccountIcon";
import ShoppingCart from "../icons/ShoppingCart";
import VinylIcon from "../icons/VinylIcon";
import GenreIcon from "../icons/GenreIcon";

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5em 1em;
  display: flex;

  @media (max-width: 960px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
    padding: 1.5em 2em;
	}
	
	@media (min-width: 1600px) and (min-height: 800px) {
    margin: 15vh auto;
  }
`;

const Tabs = styled.aside`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  position: sticky;
  top: 5em;

  @media (max-width: 960px) {
    position: static;
    flex-direction: row;
    align-self: center;
    margin-bottom: 3em;
  }
`;

const TabContent = styled.main`
  flex-grow: 1;
	margin-left: 2em;
	text-align: center; /* for loader */

  @media (max-width: 960px) {
    margin-left: 0;
  }
`;

const TabLink = styled.div`
  margin-bottom: 0.5em;
  padding: 0.5em 0.5em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ active }) => (active === "true" ? "#e76f517a" : null)};
  color: ${({ active }) => (active === "true" ? "#ffffff" : null)};

  &:hover {
    background-color: #e76f517a;
  }
`;

const TabText = styled.span`
  margin-left: 1em;
`;

const links = [
  {
    name: "profile",
    linkTo: "/user/dashboard",
    icon: <AccountIcon hover={false} color="#e76f51" />
  },
  {
    name: "cart",
    linkTo: "/user/cart",
    icon: <ShoppingCart color="#e76f51" hover={false} />
  }
];

const admin = [
  {
    name: "add vinyl",
    linkTo: "/admin/add_product",
    icon: <VinylIcon color="#e76f51" hover={false} />
  },
  {
    name: "add genre",
    linkTo: "/admin/manage_categories",
    icon: <GenreIcon color="#e76f51" hover={false} />
  }
];

const UserLayout = ({ user, children, location }) => {
  const generateLinks = links =>
    links.map((item, i) => (
      <TabLink
        as={Link}
        to={item.linkTo}
        key={item.name}
        active={location.pathname === item.linkTo ? "true" : "false"}
      >
        {item.icon}
        <TabText>{item.name}</TabText>
      </TabLink>
    ));

  return (
    <Container>
      <Tabs>
        {generateLinks(links)}
        {user.userData.isAdmin ? <>{generateLinks(admin)}</> : null}
      </Tabs>
      <TabContent>{children}</TabContent>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(withRouter(UserLayout));
