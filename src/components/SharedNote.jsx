import React, { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import ButtonComponent from "./ButtonComponent";
import { getDateFormat } from "../utils/getDateFormat";
import { getUser } from "../utils/getUser";

function SharedNote() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [specificNoteData,setSpecificNoteDate]=useState()
  const [noteOwner,setNoteOwner]=useState()
  // console.log(searchParams.get("noteId"));
  const docRef = doc(db, "note", searchParams.get("noteId"));
  const handleGetSpecificNote = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log(docSnap.data());
        setSpecificNoteDate(docSnap.data());
         const ownerData=await getUser(docSnap.data().user)
         setNoteOwner(ownerData[0]?.name)
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
  return <div className="bg-darkPrimary text-white h-screen overflow-scroll ">
{specificNoteData ?
<div className="m-10">
  <h1 className="bg-inherit w-full focus:outline-none placeholder:text-2xl text-2xl">
    {specificNoteData.title}
    </h1>
    <p className="bg-inherit w-full h-[70vh] text-white/[0.8] focus:outline-none pt-4 placeholder:text-xl text-xl">
      {specificNoteData.note}
    </p>
    <p className="text-white/[0.8] text-sm ">
      <i>
        last edited:   {getDateFormat(specificNoteData?.timeStamp)}
      {/* {specificNoteData.timeStamp} */}
      </i>
      <br />
      author: {noteOwner}
    </p>

      <div className="mt-2">

      <ButtonComponent text="create your shareable note" onClick={()=>window.location='/login'} />
      </div>
</div>
:
<>
Please Wait
</>
}
  
  
  </div>;
}

export default SharedNote;
