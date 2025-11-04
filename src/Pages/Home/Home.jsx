import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../Context/AuthContext/AuthProvider";
import { TbEditOff } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { FaRegNoteSticky } from "react-icons/fa6";

import Modal from "../../Component/Modal/Modal";
import { Bounce, toast } from "react-toastify";

import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Notes() {
  const { token } = useContext(AuthContext);
  const [notes, setnotes] = useState([]);
  const [editNote, seteditNote] = useState(false);
  const [noteValues, setnoteValues] = useState({
    title: "",
    content: "",
  });
  const [loading, setloading] = useState(false);
  function getUserNotes() {
    setloading(true);
    axios
      .get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: `3b8ny__${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setnotes(res.data.notes);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }
  function deleteNote(noteId) {
    axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        headers: {
          token: `3b8ny__${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setnotes((oldnotes) => oldnotes.filter((el) => el._id !== noteId));
        toast.success("✅ Successfully deleting note", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setnoNotes((oldNum) => oldNum - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (token) {
      getUserNotes();
    }
  }, []);
  const [openModel, setopenModel] = useState(false);

  return (
    <main className="min-h-screen  ">
      <div className="  px-6  py-20   dark:text-white    rounded-lg relative ">
       
        <div className="btn absolute end-2 top-2 ">
          <button
            onClick={() => {
              setopenModel(true);
              seteditNote(false);
            }}
            className=" flex items-center gap-2 cursor-pointer  text-white bg-[blue] dark:hover:bg-[#0000ff69]  hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            type="button">
            <FaRegNoteSticky size={15} color="white" />

            <span>Add Notes</span>
          </button>
        </div>
        <div className="search my-4">
          <input type="text" placeholder="Search Notes" className="w-full border
          border-gray-200  dark:border-gray-800 focus:outline-0 focus:border-blue-600 transition-all duration-100 rounded p-2" />
        </div>
         {loading ? (
          <div className="flex items-center justify-center">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="aqua"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          ""
        )}
          {notes.length>0 ?
            <div className="flex flex-wrap   gap-2">
              {notes.map(note => (
                <Link to={`/Note/${note._id}`}
                  onClick={() => {
                    localStorage.setItem("SelectedNote", JSON.stringify(note));
                  }}
                  className=" p-2 cursor-pointer bg-white shadow dark:bg-gray-800 rounded h-full flex flex-col justify-between  w-full md:w-[49%] lg:w-[24%]">
                  <h3 className="text-center font-bold text-2xl my-4">{note.title}</h3>
                  <p className=" break-words whitespace-normal" >{note.content.length > 300 ? `${note.content.slice(0, 300)}...` : note.content}</p>
                  <div className="flex my-2 justify-between">
                    <button className="cursor-pointer" onClick={(e) => {
                      e.preventDefault();
                      seteditNote(true);
                      setnoteValues(note);
                      setopenModel(true);
                    }} > <TbEditOff size={25} className="text-yellow-300 
                    dark:text-yellow-400 hover:text-yellow-00"  /></button>
                    <button className="cursor-pointer" onClick={(e) => {
                      deleteNote(note._id) 
                      
                       e.preventDefault();
                    }
                     
                    
                    }><MdDelete size={25} className=" text-red-500 dark:text-red-700 hover:text-red-800" /></button>
                  </div>
                  </Link>
                ))}
              </div>
            :  <div className="notFound  flex justify-center items-center">
            {!loading&&<p className="text-red-600 text-2xl">Not Found Notes</p>}
            
          </div>}
        </div>
        
     
      {openModel && (
        <Modal
          setnotes={setnotes}
          editNotes={editNote}
          setopenModel={setopenModel}
          noteValues={noteValues}
        
        />
      )}
    </main>
  );
}
//we don't use context for notesValues because i use context when i want share data
//at more than one component then the props is best in this case.
