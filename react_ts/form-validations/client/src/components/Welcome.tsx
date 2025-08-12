import React from "react";

type WelcomeProps = {
  message: string;
}

const Welcome: React.FC<WelcomeProps> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default Welcome;
