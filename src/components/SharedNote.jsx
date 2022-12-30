import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function SharedNote() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("noteId"));
  const docRef = doc(db, "note", searchParams.get("noteId"));
  const handleGetSpecificNote = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetSpecificNote();
  }, []);
  return <div>SharedNote {searchParams.get("noteId")}</div>;
}

export default SharedNote;
