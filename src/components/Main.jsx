import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { db } from "../firebase-config";
import TopBar from "../components/TopBar";
import NewNote from "../components/NewNote";
import ButtonComponent from "../components/ButtonComponent";
import NoteCard from "../components/NoteCard";
import { useUserAuth } from "../auth/UserAuthContext";
import SelectNote from "./svgComponent/SelectNote";
import { getData } from "../utils/getData";
function Main() {
  const [clickCount, setClickCount] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [editNoteData, setEditNoteData] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();
 
  async function getNotes(db) {
    try {
      console.log(user.uid);
    } catch (e) {
      window.location = "/login";
      console.log(e);
    }

   const noteList=await getData(user,"note")
    setNoteData(noteList.filter((item) => item.user === user?.uid));
   
  }
 
  useEffect(() => {
    getNotes(db);
    }, [user, showNote, clickCount]);
  useEffect(() => {
   
    if (window.screen.availWidth >= 1024) {
      setIsDesktop(true);
    } else {
      // setShowNote(false);
      setIsDesktop(false);
    }
  }, [window.screen.availWidth]);

  useEffect(() => {
    if(noteData){setLoading(true)}
    setTimeout(() => setLoading(true), 5000);

  }, []);

 
  return (
    <div
      className="bg-darkPrimary text-white h-screen overflow-scroll relative lg:overflow-hidden"
      onClick={() => setClickCount(clickCount + 1)}
    >
      <TopBar />
      <div className="">
        <div className="fixed bottom-4 right-4 z-10 lg:hidden ">
          <ButtonComponent
            onClick={() => {
              setShowNote(true);
              setEditNoteData([{ title: "", note: "" }]);
              setIsDesktop(false);
            }}
            text="Add Note"
            icon={<AiOutlinePlus size={25} />}
          />
        </div>
      </div>
      <div className=" lg:grid lg:grid-cols-12 lg:gap-2">
        <div className="  lg:pt-16 lg:col-span-3  whitespace-nowrap scrollbar-hide lg:relative lg:h-full w-full overflow-scroll sm:flex sm:flex-row sm:flex-wrap sm:items-center  lg:block lg:w-full   lg:p-4 lg:h-[95vh] lg:bg-white/[0.07] lg:top-[5%] md:gap-x-2 md:flex-wrap ">
          <div className="hidden lg:block w-full sticky top-0 z-10 ">
            <button
              onClick={() => {
                setShowNote(true);
                setEditNoteData([{ title: "", note: "" }]);
                setIsDesktop(true);
              }}
              className="hidden lg:block lg:w-full text-dark px-4 py-2 shadow-md bg-white rounded-md flex items-center space-x-2 active:bg-cyan-200 hover:bg-cyan-100 lg:text-sm"
            >
              <div className="lg:pl-[40%] lg:flex lg:items-center lg:space-x-2 ">
                <AiOutlinePlus size={15} />
                <p>Add Note</p>
              </div>
            </button>
          </div>
          <div className="absolute lg:relative top-[10%] lg:top-[2%] w-full">
            {noteData
              ?.sort((a, b) => {
                return b.timeStamp - a.timeStamp;
              })
              ?.map((item, index) => (
                <div
                  key={index}
                  className=" w-full  lg:w-full md:flex-grow md:mt-2 md:mr-2 "
                >
                  <NoteCard
                    id={item.id}
                    noteData={item}
                    setShowNote={setShowNote}
                    setEditNoteData={setEditNoteData}
                    setClickCount={setClickCount}
                    clickCount={clickCount}
                  />
                </div>
              ))}
          </div>
        </div>
        {console.log(noteData.length, showNote, "noteData")}
        {/* {noteData.length != 0 && showNote && ( */}
        <>
          {showNote ? (
            <div className="col-span-12 lg:col-span-9">
              <NewNote
                setShowNote={setShowNote}
                editNoteData={editNoteData}
                isDesktop={isDesktop}
                setEditNoteData={setEditNoteData}
              />
            </div>
          ) : (
            <>
              {isDesktop && noteData.length != 0 &&loading&& (
                <div className="absolute top-[40%] left-[40%] flex flex-col items-center max-w-md">
                  <SelectNote />
                  <p className="text-2xl">Select a note to view</p>
                  <p className="text-center text-white/[0.5]">
                    Choose a note from the list on the left to view its
                    contents, or create a new note to add to your collection.
                  </p>
                </div>
              )}
            </>
          )}
        </>
        {/* )} */}
        {console.log(editNoteData, "editNoteData")}
        {noteData.length == 0 && !showNote && !isDesktop && (
          <div className="absolute top-[40%] left-[50%] lg:left-[46%] translate-x-[-50%] flex flex-col items-center max-w-md">
            <SelectNote />
            <p className="text-xl lg:text-2xl">Please Create a Note</p>
            <p className="text-center text-white/[0.5]">
              You dont have any notes in your collection{" "}
            </p>
          </div>
        )}

        {!loading && <div className="absolute top-[40%] left-[50%] lg:left-[46%] translate-x-[-50%]">
          Loadingggg............
          </div>}
      </div>
    </div>
  );
}

export default Main;
