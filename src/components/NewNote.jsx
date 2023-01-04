import React, { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { BiSave } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,

} from "firebase/firestore";
import { db } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";
import { useUserAuth } from "../auth/UserAuthContext";
import MobileNoteContent from "./MobileNoteContent";
import DesktopNoteContent from "./DesktopNoteComponent";
function NewNote({ setShowNote, editNoteData, isDesktop,setEditNoteData }) {
  const { user } = useUserAuth()
  const [userValue, setUserValue] = useState();
  const [noteDataTitle, setNoteDataTitle] = useState("");
  const [noteData, setNoteData] = useState("  ");
  const [note, setNote] = useState();
  const [noteLength, setNoteLength] = useState();
  const handleInput = (e) => {
    if (e.target.name == "noteTitle") {
      setNoteDataTitle(e.target.value);
      setNote([{ title: e.target.value, note: noteData }]);
    }
    if (e.target.name == "note") {
      setNoteData(e.target.value);
      setNote([{ title: noteDataTitle, note: e.target.value }]);

      // console.log(noteData, "noteData");
    }
  };
  const handleSave = () => {
    setShowNote(false);
    // console.log(noteDataTitle, noteData);
    if (
      noteDataTitle?.length > 0 &&
      noteData?.length > 0 &&
      editNoteData[0]?.note?.length === 0
    ) {
      console.log("1");
      setDocFunc(noteDataTitle, noteData);
    } else if (editNoteData && editNoteData[0]?.note?.length > 0) {
      // console.log("2");
      console.log(editNoteData,'editNoteData[0]?.title')
      updateDocFunc(editNoteData[0]?.title, noteDataTitle, noteData);
    }
  };
  useEffect(() => {
    if (editNoteData.note !== "" || editNoteData !== undefined) {
      setNoteDataTitle(editNoteData[0]?.title);
      setNoteData(editNoteData[0]?.note);
    } else {
      // console.log("casala don burst");
    }
  }, [editNoteData]);

  const updateDocFunc = async (id, title, note) => {
    try {
      console.log("updating", title,id);
      const updateDocRef = await updateDoc(
        doc(db, "note", id),
        {
          title: title,
          note: note,
          country: "NG",
          id:
            noteLength?.length !== NaN || undefined
              ? noteLength?.length + 1
              : 0,
          // user: "",
          timeStamp: Date.now(),
        },
        { merge: true }
      );
      console.log("for updating", updateDocRef);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const setDocFunc = async (title, note) => {
    try {
console.log('setting doc')
      const uniqueId = uuidv4();
      const docRef = await setDoc(
        doc(db, "note", uniqueId),
        {
          title: title,
          note: note,

          id: uniqueId,
          user: user.uid,
          timeStamp: Date.now(),
        },
        { merge: true }
      );
      console.log(uniqueId, collection.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  };

  async function getNotes(db) {
    const noteCol = collection(db, "note");
    const noteSnapShot = await getDocs(noteCol);
    const noteList = noteSnapShot.docs.map((doc) => doc.data());
    setNoteLength(noteList);
  }
  useEffect(() => {
    getNotes(db);
  }, []);



 
  return (
    <>
      {isDesktop ?<DesktopNoteContent setEditNoteData={setEditNoteData} setNoteDataTitle={setNoteDataTitle} setNoteData={setNoteData}  handleInput={handleInput} setShowNote={setShowNote} handleSave={handleSave} noteData={noteData} noteDataTitle={noteDataTitle} /> : <MobileNoteContent handleInput={handleInput} setShowNote={setShowNote} handleSave={handleSave} noteData={noteData} noteDataTitle={noteDataTitle} />}</>
  );
}

export default NewNote;


