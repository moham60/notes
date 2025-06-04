import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { LuNotepadText } from "react-icons/lu";
import { RotatingLines } from "react-loader-spinner";
export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { setToken } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [messages, setmessages] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const goToHome = useNavigate();
  function handleSubmit(values) {
    setloading(true);
    axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        setmessages((oldState) => {
          return {
            ...oldState,
            successMessage: "Successfully to Login Redirecting To Home",
          };
        });
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          goToHome("/notes");
        }, 2000);

        toast.success("🦄 Welcome Back", {
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
        setloading(false);
        // Handle successful login, e.g., redirect or show a success message
      })
      .catch((err) => {
        console.error(err);

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
        toast.error(`🦄 ${err.response.data.msg}`, {
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
        setloading(false);
        // Handle error, e.g., show an error message
      });
  }
  function resetValues() {
    formikObj.resetForm();
  }
  const formikObj = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });
  return (
    <div className="bg-black min-h-screen   flex items-center justify-center text-white">
      <form
        action=""
        onSubmit={formikObj.handleSubmit}
        className="login bg-gray-900 text-white w-3/4 md:w-1/2  lg:w-1/3 px-4 py-6 rounded-lg r">
        <h1 className="  flex items-center gap-2  justify-center  text-center   mb-2">
          <LuNotepadText color="aqua" size={28} /> Login
        </h1>
        {messages.errorMessage ? (
          <div className="bg-red-700 my-4 w-[65%] m-auto rounded-sm text-center text-2xl p-2">
            {messages.errorMessage}
          </div>
        ) : (
          ""
        )}
        {messages.successMessage ? (
          <div className="bg-[#3fdf3f] my-4 w-[95%] m-auto rounded-sm text-center text-xl p-2">
            {messages.successMessage}
          </div>
        ) : (
          ""
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
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
          {formikObj.touched.email && formikObj.errors.email ? (
            <div className=" rounded-md my-2 p-2 text-red-500  mt-1">
              <span>{formikObj.errors.email}</span>
            </div>
          ) : (
            ""
          )}
        </div>
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
            className="w-full p-2 bg-gray-900 text-white rounded"
            required
          />
          {formikObj.touched.password && formikObj.errors.password ? (
            <div className="text-red-500  mt-1">
              <span>{formikObj.errors.password}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <button className="submit-btn bg-[blue] rounded-md p-2 w-full cursor-pointer hover:bg-[#142275]  border-0    transition-all duration-1000">
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
            "Login Now"
          )}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            resetValues();
          }}
          className="bg-red-700 mt-2 w-full hover:bg-red-800 cursor-pointer text-white rounded p-2 border-0">
          clear Inputs
        </button>
      </form>
    </div>
  );
}
