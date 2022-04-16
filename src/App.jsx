import React, { useState } from "react";
import logo from "./logo.svg";

function App() {
  const doLogin = async () => {
    try {
      const response = await fetch("/login", { method: "POST" });
      const result = await response.json();
      getUser();
      console.log("login-result", result);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch("/user");
      const result = await response.json();
      console.log("user-result", result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
        <img src={logo} className="animate-speed h-60" alt="logo" />
        <button onClick={doLogin}>login</button>
      </header>
    </div>
  );
}

export default App;
