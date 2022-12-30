import { deleteDoc, doc } from "firebase/firestore";
import React from "react";

import { db } from "../firebase-config";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillShareFill } from "react-icons/bs";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

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

  const handleShare = async (e, id) => {
    e.stopPropagation();
    console.log(id);
    navigate(`/sharedNote?noteId=${id}`);
    // return <Navigate to={`/sharedNote?${id}`} replace />;
  };
  const handleDelete = async (e, id) => {
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
  const shortenNote = (note,length) => {
    if (note.length > length) {
      return note.slice(0, length) + "....";
    } else {
      return note;
    }
  };
  const handleEdit = () => {
    setEditNoteData([{ title: noteData?.title, note: noteData?.note }]);
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
      className=" m-2 mx-4 p-4 pb-12 rounded-md relative  bg-white/[0.03] md:w-full md:m-0 md:hover:cursor-pointer md:hover:bg-white/[0.05] md:active:bg-white/[0.05] md:pb-10"
      onClick={() => handleEdit()}
    >
      <h1 className="text-2xl font-semibold md:text-xl">{shortenNote(noteData?.title,30)}</h1>

      <p className="flex items-center mt-1 md:text-sm">
        <p className="text-md text-white/[0.5] mr-4">{getDateFormat()}</p>
        <p className=" text-md  text-white/[0.8]">
          {shortenNote(noteData?.note,22)}
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
