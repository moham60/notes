import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../Context/AuthContext/AuthProvider";
import { TbEditOff } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { FaRegNoteSticky } from "react-icons/fa6";

import Modal from "../../Component/Modal/Modal";
import { Bounce, toast } from "react-toastify";

import { ThreeCircles } from "react-loader-spinner";

export default function Notes() {
  const { token } = useContext(AuthContext);
  const [notes, setnotes] = useState([]);
  const [editNote, seteditNote] = useState(false);
  const [noNotes, setnoNotes] = useState(0);
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
        setnoNotes(res.data.notes.length);
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
    <main className="bg-gray-950 w-full min-h-screen flex items-center justify-center   ">
      <div className=" bg-gray-900  w-[90%] p-8   text-white    rounded-lg relative ">
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
        <div className="btn absolute end-2 top-2 ">
          <button
            onClick={() => {
              setopenModel(true);
              seteditNote(false);
            }}
            className=" flex items-center gap-2 cursor-pointer  text-white bg-[blue] hover:bg-[#0000ff69]  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            type="button">
            <FaRegNoteSticky size={15} color="white" />

            <span>Add Notes</span>
          </button>
        </div>
        <div
          className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6
         ">
          {notes &&
            notes.map((note) => (
              <div
                key={note._id}
                className="note rounded-lg w-full      bg-black p-5">
                <h3 className="text-center text-xl font-extrabold my-1">
                  {note.title}
                </h3>
                <div
                  id={note._id}
                  className="icons p-3   border-b-1 flex items-center justify-between">
                  <MdDelete
                    onClick={() => deleteNote(note._id)}
                    size={28}
                    className="cursor-pointer deleteNote text-[#890707] hover:text-[red]"
                  />
                  <TbEditOff
                    size={28}
                    onClick={() => {
                      seteditNote(true);
                      setopenModel(true);
                      setnoteValues(note);
                    }}
                    className="cursor-pointer editNote text-[#065706] hover:text-[#2ee32e]"
                  />
                </div>
                <div className="noteContent mt-2 text-center">
                  <p className="text-xl ">{note.content}</p>
                </div>
              </div>
            ))}
        </div>
        {noNotes == 0 ? (
          <div className="notFound  flex justify-center items-center">
            <p className="text-red-600 text-2xl">Not Found Notes</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {openModel && (
        <Modal
          setnotes={setnotes}
          editNotes={editNote}
          setopenModel={setopenModel}
          noteValues={noteValues}
          setnonotes={setnoNotes}
        />
      )}
    </main>
  );
}
//we don't use context for notesValues because i use context when i want share data
//at more than one component then the props is best in this case.
