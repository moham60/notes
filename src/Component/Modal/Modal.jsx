import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import axios from "axios";

import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
export default function Modal({
  setopenModel,
  setnotes,
  editNotes,
  noteValues,
  
}) {
  const { token } = useContext(AuthContext);
  const handleClose = () => {
    setopenModel(false);
  };

  function updateNote(values) {
    axios
      .put(
        // eslint-disable-next-line react/prop-types
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteValues._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success(" Successfully Updating note", {
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
        setTimeout(() => {
          handleClose();
        }, 200);
        setnotes((oldNotes) =>
          oldNotes.map(
            // eslint-disable-next-line react/prop-types
            (note) => (note._id === noteValues._id ? res.data.note : note)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function addNote(values) {
    axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers: {
          token: `3b8ny__${token}`,
        },
      })
      .then((res) => {
        console.log("addNote", res);
        setnotes((oldnotes) => [...oldnotes, res.data.note]);
        toast.success(" Successfully adding note", {
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
      
        setTimeout(() => {
          handleClose();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function resetValues() {
    formikObj.resetForm();
  }

  const formikObj = useFormik({
    initialValues: {
      // eslint-disable-next-line react/prop-types
      title: editNotes ? noteValues.title : "",
      // eslint-disable-next-line react/prop-types
      content: editNotes ? noteValues.content : "",
    },

    onSubmit: editNotes ? updateNote : addNote,

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title of Note is Required")
        .min(4, "Title Must Be Greater than or Equal Five Characters"),
    }),
  });
  return (
    <>
      <div
        tabIndex={-1}
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative  rounded-lg shadow-sm bg-gray-900">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 ">
              <h3 className="text-2xl font-bold  text-white">
                {editNotes ? "Update Note" : "Create New Note"}
              </h3>
              <button
                type="button"
                className="text-gray-400 cursor-pointer bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                onClick={handleClose}>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5" onSubmit={formikObj.handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.title}
                    id="title"
                    className="border border-gray-300text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 bg-white border-gray-500 dark:placeholder-gray-400  focus:border-primary-500"
                    placeholder="Type Note Title"
                  />
                </div>
                {formikObj.touched.title && formikObj.errors.title ? (
                  <div className="text-red-600 ">
                    <p>{formikObj.errors.title}</p>
                  </div>
                ) : (
                  ""
                )}

                <div className="col-span-2">
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium  text-white">
                    Note Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={5}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.content}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write Note Content here"
                  />
                </div>
                {formikObj.touched.content && formikObj.errors.content ? (
                  <div className="text-red-600 ">
                    <p>{formikObj.errors.content}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="btns flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (formikObj.values.title || formikObj.values.content) {
                      resetValues();
                    }
                  }}
                  className="bg-red-700 hover:bg-red-800 cursor-pointer text-white rounded p-2 border-0">
                  clear Inputs
                </button>
                <button
                  type="submit"
                  className="text-white cursor-pointer inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {editNotes ? "Update Note" : " Add new Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
