import { useContext } from "react";
import { LuNotepadText } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const logOut = useNavigate();
  return (
    <div className=" bg-gray-900   p-5 ">
      <div className=" w-[85%] m-auto flex flex-col md:flex-row gap-3 justify-between items-center f">
        <Link to="/notes" className="logo">
          <h3 className="text-2xl flex items-center gap-2  font-bold text-white">
            <LuNotepadText color="aqua" />

            <span className="">NoteApp</span>
          </h3>
        </Link>
        <div className="right">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to="/notes"
                className="text-white  text-md  hover:bg-[blue] p-2 rounded-md transition-all duration-300">
                Home
              </NavLink>
            </li>
            <li>
              {token ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    logOut("/login");
                  }}
                  className="text-white cursor-pointer text-md  p-2  rounded-md hover:bg-[red] transition-all duration-300">
                  SignOut
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="text-white text-md hover:bg-[blue] p-2 rounded-md transition-all duration-300">
                  Login
                </NavLink>
              )}
            </li>
            {!token ? (
              <li>
                <NavLink
                  to="/register"
                  className="text-white text-md  hover:bg-[blue] p-2 rounded-md transition-all duration-300">
                  Register
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
