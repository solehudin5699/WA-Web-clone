import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { useStateValue } from "./StateProvider";
import Home from "./pages/Home/Home";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app_body'>
          <Home />
        </div>
      )}
    </div>
  );
}

export default App;
