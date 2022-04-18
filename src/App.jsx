import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";

function App() {
  const inputElement = useRef(null);
  const [postList, setPostList] = useState([]);
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

  const sendImage = async () => {
    const image = inputElement.current.files[0];
    const formData = new FormData();
    formData.append("userName", "Groucho");
    formData.append("content", "heheueeoooooo!");
    formData.append("userPhoto", image);
    try {
      const response = await fetch("/posts", {
        body: formData,
        method: "post",
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async () => {
    try {
      const response = await fetch("/posts");
      const result = await response.json();
      console.log("result", result);
      setPostList(result?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
        <img src={logo} className="animate-speed h-60" alt="logo" />
        <button onClick={doLogin}>login</button>
        <div className=" bg-green-700">
          <input ref={inputElement} type="file" />
          <button className=" block bg-gray-400 p-2" onClick={sendImage}>
            send file
          </button>
          <ul>
            {postList.map((item) => (
              <li key={item._id}>
                <span>{item.userName}</span>
                <p>{item.content}</p>
                <img src={item.userPhoto} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
