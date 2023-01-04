import { deleteDoc, doc } from "firebase/firestore";
import React from "react";

import { db } from "../firebase-config";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillShareFill } from "react-icons/bs";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const navigate = useNavigate();
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    const hasclosingTag = str.replace(/(<([^>]+)>)/gi, "").includes("</");
    if (hasclosingTag) {
      return str.replace(/(<([^>]+)>)/gi, "").slice(0, -7);
    } else return str.replace(/(<([^>]+)>)/gi, "");
  }

  async function copyContent() {
    try {
      await navigator.clipboard.writeText("This is the text to be copied");
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
    copyContent();
    window.open(
      "whatsapp://send?text=" +
        "Mitchel has shared a priviate note with you, click to open",

      "_blank"
    );
    // navigate(`/sharedNote?noteId=${id}`);
    // return <Navigate to={`/sharedNote?${id}`} replace />;
  };
  const handleDelete = async (e, id) => {
    console.log(id, "id");
    e.stopPropagation();
    try {
      const noteRef = doc(db, "note", String(id));
      const docRef = await deleteDoc(noteRef);
      console.log("Document written with ID: ", docRef);
      setClickCount(clickCount + 1);
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

  const getDateFormat = () => {
    const date = new Date(noteData?.timeStamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return String(day + "/" + month + "/" + year);
  };
  return (
    <div
      className="  m-2 mx-4 p-4 pb-12 rounded-md relative  bg-white/[0.03] md:w-full md:m-0 md:hover:cursor-pointer md:hover:bg-white/[0.05] md:active:bg-white/[0.05] md:pb-10"
      onClick={() => handleEdit()}
    >
      {/* {console.log(noteData)} */}
      <h1 className="text-2xl font-semibold md:text-xl">
        {shortenNote(noteData?.title, 22)}
      </h1>

      <p className="flex items-center mt-1 md:text-sm">
        <p className="text-md text-white/[0.5] mr-4">{getDateFormat()}</p>
        <p className=" text-md  text-white/[0.8]">
          {removeTags(shortenNote(noteData?.note, 22))}
        </p>
      </p>

      <div className="flex absolute  bottom-4 right-4 z-9 w-fit">
        <div className="px-4" onClick={(e) => handleShare(e, id)}>
          <BsFillShareFill
            size={15}
            color={" #F1F5F9"}
            className="active:fill-slate-50 hover:fill-slate-60"
          />
        </div>
        <div className="w-fit  " onClick={(e) => handleDelete(e, id)}>
          <RiDeleteBin6Fill
            size={15}
            color={"#F1F5F9"}
            className="active:fill-black-100 fill-black-60"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
