import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   const  handleSubmit= async (e)=> {
     e.preventDefault();
     const response = await fetch("http://localhost:4000/register", {
       method: "POST",
       body: JSON.stringify({ username, password }),
       headers: { "Content-Type": "application/json" },
     });
     if (response.status === 200) {
       alert("registration successful");
     } else {
       alert("registration failed");
     }
   }
  

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
