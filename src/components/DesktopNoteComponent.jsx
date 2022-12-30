import React from 'react'
import ButtonComponent from './ButtonComponent'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiSave } from 'react-icons/bi'
import ReactQuill from 'react-quill'
import EditorToolbar, { } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import './textEditor.css'

function MobileNoteContent({ handleInput, setShowNote, handleSave, noteData, noteDataTitle }) {
    const [state, setState] = React.useState({ value: `<h1>just say it bro</h1><p>this is just</p><p> i know you want it this way <b>ok<b></p>` });
    const handleChange = value => {
        setState({ value });
        console.log(value)
    };

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['clean'],
        ],
        clipboard: {
            matchVisual: true,
        },
    }
    return (
        <div className=" top-[8%] h-full  w-full bg-darkPrimary  pt-6 overflow-y-hidden">
            <form className="m-6 mt-12">
                <input
                    name="noteTitle"
                    onChange={(e) => handleInput(e)}
                    placeholder="Title"
                    value={noteDataTitle}
                    className="bg-inherit w-full focus:outline-none placeholder:text-2xl text-2xl "
                />
                {/* <textarea
        onChange={(e) => handleInput(e)}
        name="note"
        placeholder="Note"
        value={noteData}
      /> */}
                <ReactQuill
                    theme="snow"
                    value={state.value}
                    onChange={handleChange}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    className="bg-inherit w-full h-[70vh]  text-white/[0.8] focus:outline-none pt-4 placeholder:text-xl text-xl"

                />
            </form>
            <div className="ml-12 flex items-center z-10 relative">
                
                <div className="pr-4">
                    <ButtonComponent
                        onClick={handleSave}
                        text="Save Note"
                        icon={<BiSave size={17} />}
                    />
                </div>
                <div onClick={() => setShowNote(false)}>
                    <ButtonComponent
                        text="Discard"
                        icon={<AiOutlineDelete size={15} />}
                    />
                </div>
            </div>
        </div>
    )
}

export default MobileNoteContent


const EditorModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const EditorFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/*
 * PropType validation
 */
//  const EditorPropTypes = {
//     placeholder: PropTypes.string,
//   }
