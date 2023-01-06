import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../auth/UserAuthContext";
import ButtonComponent from "./ButtonComponent";
import { AiOutlineArrowRight } from "react-icons/ai";

function Login() {
  const { signInWithGoogle, user } = useUserAuth();
  const [show, setShow] = useState(false);
  const [showProceed, setShowProceed] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 5000);
  }, []);
  useEffect(() => {
    setTimeout(() => setShowProceed(true), 5000);
  }, [user]);
  return (
    <div className="relative w-full h-screen  bg-darkSecondary">
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white">
        {show ? (
          <>
            {!user ? (
              <GoogleButton onClick={signInWithGoogle} />
            ) : (
              <>
              {showProceed &&
                <div className="flex items-center flex-col gap-4">
                <a href="/app">Login succesful</a>
                <a href="/app">
                <ButtonComponent text="Proceed" />
                </a>
                </div>
              }
              </>
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
