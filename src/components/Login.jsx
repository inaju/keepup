import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../auth/UserAuthContext";

function Login() {
  const { signInWithGoogle, user } = useUserAuth();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
  }, []);
  return (
    <div>
      {show ?
      <>
      {!user ? (
        <GoogleButton onClick={signInWithGoogle} />
        ) : (
          <a href="/">Logged in, proceed to app, click me</a>
          )}
          </>
          :
    <p>Loading...</p>
          }
    </div>
  );
}

export default Login;
