import { deleteDoc, doc } from "firebase/firestore";
import React from "react";

import { db } from "../firebase-config";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillShareFill } from "react-icons/bs";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDateFormat } from "../utils/getDateFormat";
import { removeTags } from "../utils/removeTags";

function NoteCard({
  title,
  note,
  id,
  setEditNoteData,
  setShowNote,
  setClickCount,
  clickCount,
  noteData,
}) {


  async function copyContent(link) {
    try {
      document.execCommand("copy");

      await navigator.clipboard.writeText(link);
      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error("Failed to copy: ", err);
      /* Rejected - text failed to copy to the clipboard */
    }
  }
  const handleShare = async (e, id) => {
    e.stopPropagation();
    console.log(id);
    copyContent(window.location.hostname+":3000"+`/sharedNote?noteId=${id}`);
    toast.info('link copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  };
  const handleDelete = async (e, id) => {
    console.log(id, "id");
    e.stopPropagation();
    try {
      const noteRef = doc(db, "note", String(id));
      const docRef = await deleteDoc(noteRef);
      console.log("Document written with ID: ", docRef);
      setClickCount(clickCount + 1);
      toast.warn('Item Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const shortenNote = (note, length) => {
    if (note.length > length) {
      return note.slice(0, length) + " ...";
    } else {
      return note;
    }
  };

  const handleEdit = () => {
    setEditNoteData([
      { title: noteData?.title, note: noteData?.note, id: noteData?.id },
    ]);
    setShowNote(true);
  };

  
  return (
    <div
      className="  m-2 mx-4 p-4 pb-12 rounded-md relative  bg-white/[0.03] md:w-full md:m-0 md:hover:cursor-pointer md:hover:bg-white/[0.05] md:active:bg-white/[0.05] md:pb-10"
      onClick={() => handleEdit()}
    >
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
      {/* {console.log(noteData)} */}
      <h1 className="text-2xl font-semibold md:text-xl">
        {shortenNote(noteData?.title, 22)}
      </h1>

      <p className="flex items-center mt-1 md:text-sm">
        <p className="text-md text-white/[0.5] mr-4">{getDateFormat(noteData?.timeStamp)}</p>
        <p className=" text-md  text-white/[0.8]">
          {removeTags(shortenNote(noteData?.note, 22))}
        </p>
      </p>

      <div className="flex absolute  bottom-4 right-4 z-9 w-fit">
        <div className="px-4" onClick={(e) => handleShare(e, id)}>
          <BsFillShareFill
            size={15}
            color={" #F1F5F9"}
            className="active:fill-white/[0.5] hover:fill-white/[0.5]"
          />
        </div>
        <div className="w-fit  " onClick={(e) => handleDelete(e, id)}>
          <RiDeleteBin6Fill
            size={15}
            color={"#F1F5F9"}
            className="active:fill-white/[0.5] hover:fill-white/[0.5]"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
