import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../auth/UserAuthContext";
import ButtonComponent from "./ButtonComponent";
import { AiOutlineArrowRight } from "react-icons/ai";

function Login() {
  const { signInWithGoogle, user } = useUserAuth();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
  }, []);
  return (
    <div className="relative w-full h-screen border border-red-400 bg-darkSecondary">
      <div className=" absolute top-[50%] left-[30%] text-white">
        {show ? (
          <>
            {!user ? (
              <GoogleButton onClick={signInWithGoogle} />
            ) : (
              <div className="flex items-center flex-col gap-4">
                <a href="/">Login succesful</a>
                <a href="/">
                  <ButtonComponent text="Proceed" />
                </a>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Login;
