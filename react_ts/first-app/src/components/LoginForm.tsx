import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface UserData {
  username: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    login(userData);
  }

  return (
    <form
      onSubmit={handleLogin}
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        gap: "10px 0",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0 10px" }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          style={{ padding: "0.3rem" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0 10px" }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          style={{ padding: "0.3rem" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0 10px" }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          style={{ padding: "0.3rem" }}
        />
      </div>

      <button type="submit" style={{ padding: "0.5rem 1.2rem" }}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
