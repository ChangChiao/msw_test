import React, { useState } from "react";
import logo from "./logo.svg";
import poweredBy from "./powered-by-vitawind-dark.png";

function App() {
  const [count, setCount] = useState(0);
  const doLogin = async () => {
    console.log("doLogin");
    try {
      const result = await fetch("/login", { method: "POST" });
      console.log("result", result);
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
