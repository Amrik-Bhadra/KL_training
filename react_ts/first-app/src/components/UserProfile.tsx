import React from "react";
import Avatar from "./Avatar";

interface User {
  username: string | undefined;
  email: string | undefined;
}

const UserProfile: React.FC<User> = ({ username, email }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0px 1rem", marginTop: '1rem' }}>
      <Avatar name={username} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: '5px 0',
        }}
      >
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
