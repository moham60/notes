import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { LuNotepadText } from "react-icons/lu";

import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: 0,
    phone: "",
  };
  const gotoLogin = useNavigate();
  const [loading, setloading] = useState(false);
  const [messages, setmessages] = useState({
    errorMessage: "",
    successMessage: "",
  });
  function handleSubmit(values) {
    setloading(true);
    axios
      .post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp
`,
        values
      )
      .then((res) => {
        console.log(res);
        setloading(false);
        setmessages((oldState) => {
          return {
            ...oldState,
            successMessage: "Successfully To Register, Redirecting to Login ",
          };
        });
        toast.success(`🦄 Success To Register`, {
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
          gotoLogin("/login");
        }, 2000);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        setmessages((oldState) => {
          return {
            ...oldState,
            errorMessage: `${err.response.data.msg}`,
          };
        });

        setTimeout(() => {
          setmessages((oldState) => {
            return {
              ...oldState,
              errorMessage: "",
            };
          });
        }, 1500);
      });
  }
  const formikObj = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      age: Yup.number()
        .required("Age is required")
        .min(1, "Age must be a positive number")
        .max(80, "Age must be less than 80"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  });
  function resetValues() {
    formikObj.resetForm();
  }

  return (
    <div className=" min-h-[100vh] py-10 flex items-center justify-center dark:text-white">
      <form
        action=""
        onSubmit={formikObj.handleSubmit}
        className="login bg-white shadow-2xl dark:bg-gray-900  w-3/4 md:w-1/2  lg:w-1/3 px-4 py-6 rounded-lg ">
        <h1 className="text-lg  flex items-center gap-2  justify-center  text-center  font-bold mb-2">
          <LuNotepadText color="aqua" size={28} /> Register
        </h1>
      
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={formikObj.handleChange}
            value={formikObj.values.name}
            onBlur={formikObj.handleBlur}
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
            className="w-full p-2 border dark:border-gray-700 border-gray-300 focus:outline-0 focus:border-blue-600 dark:bg-gray-900rounded"
            required
          />
        </div>
        {formikObj.touched.name && formikObj.errors.name ? (
          <div className="text-red-500  mt-1">
            <span>{formikObj.errors.name}</span>
          </div>
        ) : (
          " "
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={formikObj.handleChange}
            value={formikObj.values.email}
            onBlur={formikObj.handleBlur}
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            className="w-full p-2 border dark:border-gray-700 border-gray-300 focus:outline-0 focus:border-blue-600 dark:bg-gray-900 rounded"
            required
          />
        </div>
        {formikObj.touched.email && formikObj.errors.email ? (
          <div className="text-red-500  mt-1">
            <span>{formikObj.errors.email}</span>
          </div>
        ) : (
          ""
        )}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={formikObj.handleChange}
            value={formikObj.values.password}
            onBlur={formikObj.handleBlur}
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            className="w-full p-2 border  dark:border-gray-700 border-gray-300 focus:outline-0 focus:border-blue-600 dark:bg-gray-900 rounded"
            required
          />
        </div>
        {formikObj.touched.password && formikObj.errors.password ? (
          <div className="text-red-500  mt-1">
            <span>{formikObj.errors.password}</span>
          </div>
        ) : (
          ""
        )}
        <div className="mb-4">
          <label htmlFor="age" className="block mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            onChange={formikObj.handleChange}
            value={formikObj.values.age}
            onBlur={formikObj.handleBlur}
            name="age"
            autoComplete="off"
            placeholder="Enter your age"
            className="w-full p-2 border dark:border-gray-700 border-gray-300 focus:outline-0 focus:border-blue-600 dark:bg-gray-900 rounded"
            required
          />
        </div>

        {formikObj.touched.age && formikObj.errors.age ? (
          <div className="text-red-500  mt-1">
            <span>{formikObj.errors.age}</span>
          </div>
        ) : (
          ""
        )}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            onChange={formikObj.handleChange}
            value={formikObj.values.phone}
            onBlur={formikObj.handleBlur}
            name="phone"
            autoComplete="off"
            placeholder="Enter your phone number"
            className="w-full p-2 border dark:border-gray-700 border-gray-300 focus:outline-0 focus:border-blue-600 dark:bg-gray-900 rounded"
            required
          />
        </div>
        {formikObj.touched.phone && formikObj.errors.phone ? (
          <div className="text-red-500  mt-1">
            <span>{formikObj.errors.phone}</span>
          </div>
        ) : (
          ""
        )}

        <button className="submit-btn text-white bg-[blue] rounded-md p-2 w-full cursor-pointer hover:bg-[#142275]  border-0    transition-all duration-1000   ">
          {loading ? (
            <div className="loader flex items-center justify-center">
              <RotatingLines
                visible={true}
                height="25"
                width="25"
                color="white"
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            "Register Now"
          )}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            resetValues();
          }}
          className="bg-red-700 mt-2 w-full  hover:bg-red-800 cursor-pointer text-white rounded p-2 border-0">
          clear Inputs
        </button>
      </form>
    </div>
  );
}
