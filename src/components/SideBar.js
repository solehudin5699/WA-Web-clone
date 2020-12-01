import React, { useState, useEffect } from "react";
import db from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import {} from "@material-ui/icons";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import "./SideBar.css";
import ChatIcon from "@material-ui/icons/Chat";
import { SearchOutlined } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SideBarChat from "./SideBarChat";
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";

export default function SideBar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
    console.log(rooms);
  }, []);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        alert("Successfully logout");
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      })
      .catch(() => alert("Failed logout"));
  };
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src={user?.photoURL} onClick={logout} />
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start chat' type='text' />
        </div>
      </div>

      <div className='sidebar_chats'>
        <SideBarChat addNewChat />
        {rooms.map((room) => (
          <SideBarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}
