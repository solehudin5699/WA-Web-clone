import React, { useState, useEffect } from "react";
import "./SideBarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import { Link, useHistory } from "react-router-dom";

export default function SideBarChat({ id, name, addNewChat }) {
  const [avatar, setAvatar] = useState();
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  useEffect(() => {
    let avt = Math.random().toFixed(3) * 1000;
    setAvatar(avt);
  }, []);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  const history = useHistory();
  return !addNewChat ? (
    // <Link to={`/rooms/${id}`}>
    <div className='sidebarChat' onClick={() => history.push(`/rooms/${id}`)}>
      <Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`} />
      <div className='sidebarChat_info'>
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add new chat</h2>
    </div>
  );
}
