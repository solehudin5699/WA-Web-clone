import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

export default function Login() {
  const [{}, dispatch] = useStateValue();
  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
    console.log(auth.app);
  };

  return (
    <div className='login'>
      <div className='login_container'>
        <img
          src='https://pngimg.com/uploads/whatsapp/whatsapp_PNG20.png'
          alt=''
        />
        <div className='login_text'>
          <h1>Sign In to whatsapp</h1>
        </div>
        <Button onClick={SignIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}
