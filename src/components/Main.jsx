import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";
import TopBar from "../components/TopBar";
import NewNote from "../components/NewNote";
import ButtonComponent from "../components/ButtonComponent";
import NoteCard from "../components/NoteCard";
import { useUserAuth } from "../auth/UserAuthContext";
function Main() {
  const [clickCount, setClickCount] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [editNoteData, setEditNoteData] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const { user } = useUserAuth();
  if (!user) {
    // window.location = "/login";
  } else {
    // getNotes(db)
  }
  async function getNotes(db) {
    try {
      console.log(user.uid);
    } catch (e) {
      window.location = "/login";
      console.log(e);
    }
    var tempList = [];
    const noteCol = collection(db, "note");
    const noteSnapShot = await getDocs(noteCol);
    const noteList = noteSnapShot.docs.map((doc) => doc.data());
    // setNoteData(noteList);
    setNoteData(noteList.filter((item) => item.user === user?.uid));
    onSnapshot(noteCol, (docsSnap) => {
      docsSnap.forEach((doc) => {
        if (doc.data().user == user?.uid) {
          console.log(doc.data());
          tempList.push(doc.data().user == user?.uid && doc.data());
        }
        setNoteData(tempList);
      });
    });
  }

  // useEffect(() => {
  //   getNotes(db);
  // }, [showNote, clickCount]);
  useEffect(() => {
    getNotes(db);
    console.count();
    console.log('window', window.screen.availWidth)
    if (window.screen.availWidth >= 1024) {
      setIsDesktop(true)
    } else {
      setIsDesktop(false)

    }
  }, [user, showNote]);

  return (
    <div
      className="bg-darkPrimary text-white h-screen overflow-scroll relative"
      onClick={() => setClickCount(clickCount + 1)}
    >
      {/* {console.log(clickCount)} */}
      <TopBar />
      <div className="">
        <div className="fixed bottom-4 right-4 z-10 lg:hidden ">
          <ButtonComponent
            onClick={() => {
              setShowNote(true);
              setEditNoteData([{ title: "", note: "" }]);
            }}
            text="Add Note"
            icon={<AiOutlinePlus size={25} />}
          />
        </div>
        
      </div>
      <div className=" lg:grid lg:grid-cols-12 lg:gap-2">
      <div className=" absolute top-[10%] lg:pt-16 lg:col-span-3  whitespace-nowrap overflow-auto scrollbar-hide lg:relative lg:h-full w-full overflow-scroll sm:flex sm:flex-row sm:flex-wrap sm:items-center  lg:block lg:w-full   lg:p-4 lg:h-[95vh] lg:bg-white/[0.07] lg:top-[5%] md:gap-x-2 md:flex-wrap ">
          {noteData
            ?.sort((a, b) => {
              return b.timeStamp - a.timeStamp;
            })
            ?.map((item, index) => (
              <div key={index} className="  lg:w-full md:flex-grow md:mt-2 md:mr-2 ">
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
        {showNote &&
        <div className="lg:col-span-9">

        <NewNote setShowNote={setShowNote} editNoteData={editNoteData} isDesktop={isDesktop} />
        </div>
        }

     
      </div>
    </div>
  );
}

export default Main;
