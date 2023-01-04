import React from "react";
import { useUserAuth } from "../auth/UserAuthContext";

function TopBar() {
  const { logOut, user } = useUserAuth();

  return (
    <div className=" bg-cyan-500  w-full fixed top-0 z-10 flex justify-between">
      <h1 className="logo px-4 py-2 text-2xl">Keepup</h1>
      {/* {console.log(user?.photoURL)} */}
      <img
        src={user?.photoURL}
        onClick={logOut}
        referrerPolicy="no-referrer"
        className="rounded-full h-12 w-12 mr-4 p-2 hover:cursor-pointer"
      />
      {/* <p >Logout</p> */}
    </div>
  );
}

export default TopBar;
