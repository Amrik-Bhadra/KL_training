import React from "react";
import UserProfile from "./components/UserProfile";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, logout, isLoggedIn } = useAuth();
  function handleLogout(){
    logout();
  }

  return (
    <>
      {!isLoggedIn && (
        <div
          style={{ border: "1px solid red", margin: "10px", padding: "10px" }}
        >
          <h1 style={{ marginBottom: '10px' }}>Login Form</h1>
          <LoginForm />
        </div>
      )}

      {isLoggedIn && (
        <div
          style={{ border: "1px solid red", margin: "10px", padding: "10px" }}
        >
          <h1>User Logged In</h1>
          <UserProfile username={user?.username} email={user?.email} />
          <button
            onClick={handleLogout}
            style={{ padding: "0.8rem 1.2rem", marginTop: "0.8rem" }}
          >
            logout
          </button>
        </div>
      )}
    </>
  );
}

export default App;
