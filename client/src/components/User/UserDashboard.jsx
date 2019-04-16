import React from "react";
import UserLayout from "./UserLayout";
import UserHistory from "./UserHistory";
import Button from "../Button";

const UserDashboard = React.memo(({ user }) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{user.userData.name}</span>
            <span>{user.userData.lastname}</span>
            <span>{user.userData.email}</span>
          </div>
          <Button
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        {user.userData.history ? (
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block_wrapper">
              <UserHistory products={user.userData.history} />
            </div>
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
});

export default UserDashboard;
