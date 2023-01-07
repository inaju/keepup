import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
function NavBar() {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute top-0 flex items-center justify-between w-full p-4 text-white lg:px-20 ">
      <h1 className="logo px-4 py-2 text-2xl">Keepup</h1>

      <div className="sm:hidden">
        <div
          className={show ? "hidden" : "block"}
          onClick={() => setShow(!show)}
        >
          <RxHamburgerMenu size={30} />
        </div>
        <div
          className={!show ? "hidden" : "block  "}
          onClick={() => setShow(!show)}
        >
          <AiOutlineClose size={25} />
        </div>
      </div>
      <ul className="hidden lg:flex lg:flex-row  lg:items-start lg:justify-between lg:w-full lg:max-w-sm  ">
        <li className="active:font-semibold active:text-white hover:text-white text-white/[0.6]">
          <a href="" rel="noreferrer">
            Home
          </a>
        </li>
        <li className="active:font-semibold active:text-white hover:text-white text-white/[0.6]">
          <a href="" rel="noreferrer">
            Product
          </a>
        </li>
        <li className="active:font-semibold active:text-white hover:text-white text-white/[0.6]">
          <a href="" rel="noreferrer">
            About
          </a>
        </li>
      </ul>
      <button
        onClick={() => (window.location = "/login")}
        className="hidden lg:flex p-2 px-6 shadow-lg bg-black/[0.3] rounded-md text-white font-semibold hover:text-white hover:bg-cyan-500"
      >
        Login
      </button>
      {show && (
        <div
          onClick={() => setShow(!show)}
          className="absolute top-0 left-0 h-screen w-screen z-10 bg-cyan-500"
        >
          <div
            className={!show ? "hidden" : "block right-4 top-6 absolute "}
            onClick={() => setShow(!show)}
          >
            <AiOutlineClose size={25} />
          </div>
          <ul className="text-xl mt-20 flex items-center flex-col justify-between  h-1/3 ">
            <li className="active:font-semibold hover:text-white/[0.6]">
              <a href="/" rel="noreferrer">
                Home
              </a>
            </li>
            <li className="active:font-semibold hover:text-white/[0.6]">
              <a
                href="/login"
                // target="_blank"
                rel="noreferrer"
              >
                Product
              </a>
            </li>
            <li className="active:font-semibold hover:text-white/[0.6]">
              <a href="" rel="noreferrer">
                About
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
