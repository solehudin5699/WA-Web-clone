import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";

export default function Chat() {
  const [avatar, setAvatar] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let avt = Math.random().toFixed(3) * 1000;
    setAvatar(avt);
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}
          onClick={() => history.push(`/`)}
        />
        <div className='chat_headerInfo'>
          <h3>{roomName}</h3>
          <p>
            last seen {"..."}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat_body'>
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}>
            <span className='chat_name'>{message.name} </span>
            {message.message}
            <span className='chat_timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className='chat_footer'>
        <InsertEmoticon />
        <form>
          <input
            type='text'
            placeholder='Type your message'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit' onClick={(e) => sendMessage(e)}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
