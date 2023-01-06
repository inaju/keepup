import React,{useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai"
function NavBar() {
    const [show,setShow]=useState(false)
    return (
        <div className='absolute top-0 flex items-center justify-between w-full p-4 text-white lg:px-20 '>
            <h1 className="logo px-4 py-2 text-2xl">Keepup</h1>

            <div className={show ? 'hidden' :'block'} onClick={()=>setShow(!show)}>

                <RxHamburgerMenu size={30}  />
            </div>
            <div className={!show ? 'hidden' :'block'} onClick={()=>setShow(!show)}>

                <AiOutlineClose size={25} />
            </div>
            <ul className='hidden'>
                <li>

                    <a
                        href="https://github.com/oslabs-beta/oslabs-beta"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Github
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar