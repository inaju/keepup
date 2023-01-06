import React from "react";
import { useUserAuth } from "../auth/UserAuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function TopBar() {
  const { logOut, user } = useUserAuth();
  const handleLogout = () => {
    toast.warn("You;ve logged out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    logOut()
  }
  return (
    <div className=" bg-cyan-500  w-full fixed top-0 z-10 flex justify-between">
      <h1 className="logo px-4 py-2 text-2xl hover:cursor-pointer" onClick={() => window.location = "/"} >Keepup</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* {console.log(user?.photoURL)} */}
      <img
        src={user?.photoURL}
        onClick={handleLogout}
        referrerPolicy="no-referrer"
        className="rounded-full h-12 w-12 mr-4 p-2 hover:cursor-pointer"
      />
      {/* <p >Logout</p> */}
    </div>
  );
}

export default TopBar;
