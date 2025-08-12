import React from "react";

interface Avtar {
  name: string | undefined;
}

const Avatar: React.FC<Avtar> = ({ name }) => {
  function getInitials(name: string): string {
    return name
      .toUpperCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  }

  return (
    <div
      style={{
        height: "3rem",
        width: "3rem",
        borderRadius: "100%",
        backgroundColor: "#06d69e92",
        border: '1px solid #06d6a0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1rem'
      }}
    >
      {getInitials(name || 'User')}
    </div>
  );
};

export default Avatar;
