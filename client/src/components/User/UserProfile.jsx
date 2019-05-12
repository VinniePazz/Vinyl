import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import UserLayout from "./UserLayout";
import UserHistory from "./UserHistory";
import Button from "@material-ui/core/Button";
import { Heading } from "../../styled_components";

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  a {
    margin-top: 0.8em;
  }
`;

const UserInfoText = styled.p`
  padding: 0.2em;

  span {
    color: #e76f51;
    font-size: 0.9rem;
  }
`;

const HistoryHeading = styled(Heading)`
  margin-top: 3rem;
`;

const UserProfile = React.memo(({ user }) => {
  return (
    <UserLayout>
      <UserInfoBlock>
        <UserInfoText>
          <span>name:</span> {user.userData.name}
        </UserInfoText>
        <UserInfoText>
          <span>email:</span> {user.userData.email}
        </UserInfoText>
        <Button
          component={Link}
          to={"/user/user_profile"}
          variant="outlined"
          color="secondary"
        >
          Edit profile info
        </Button>
      </UserInfoBlock>

      {user.userData.history.length > 0 ? (
        <>
          <HistoryHeading>History of purchases</HistoryHeading>
          <div className="user_product_block_wrapper">
            <UserHistory products={user.userData.history} />
          </div>
        </>
      ) : (
        <>
          <HistoryHeading>History of purchases</HistoryHeading>
          <p
            style={{ paddingTop: "1.5em", color: "rgba(250, 250, 250, 0.35)" }}
          >
            history is empty...
          </p>
          <Button
            component={Link}
            to={`/shop`}
            variant="text"
            color="secondary"
            style={{ marginTop: "1.5em" }}
          >
            go to shop
          </Button>
        </>
      )}
    </UserLayout>
  );
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect()(UserProfile);
