import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Chat from "../../components/Chat";

function Home() {
  return (
    <>
      <Router>
        <SideBar />
        <Switch>
          <Route path='/rooms/:roomId'>
            <Chat />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Home;
