import React from 'react'
import ButtonComponent from './ButtonComponent'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiSave } from 'react-icons/bi'

function MobileNoteContent({handleInput,setShowNote,handleSave,noteData,noteDataTitle}) {
  return (
    <div className="fixed top-0 left-0 bottom-0  h-screen w-full z-10 bg-darkPrimary px-4 pt-6 overflow-y-hidden">
    <form className="mt-6">
      <input
        name="noteTitle"
        onChange={(e) => handleInput(e)}
        placeholder="Title"
        value={noteDataTitle}
        className="bg-inherit w-full focus:outline-none placeholder:text-2xl text-2xl "
      />
      <textarea
        onChange={(e) => handleInput(e)}
        name="note"
        placeholder="Note"
        value={noteData}
        className="bg-inherit w-full h-[75vh] text-white/[0.8] focus:outline-none pt-4 placeholder:text-xl text-xl"
      />
    </form>
    <div className=" flex items-center">
      <div className="pr-4">
        <ButtonComponent
          onClick={handleSave}
          text="Save Note"
          icon={<BiSave size={20} />}
        />
      </div>
      <div onClick={() => setShowNote(false)}>
        <ButtonComponent
          text="Discard"
          icon={<AiOutlineDelete size={20} />}
        />
      </div>
    </div>
  </div>
  )
}

export default MobileNoteContent