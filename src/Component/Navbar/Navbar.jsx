import { useContext } from "react";
import { LuNotepadText } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { themeContext } from "../../Context/ThemeContext/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const logOut = useNavigate();
  const { theme, toggoleTheme } = useContext(themeContext);
  return (
    <div className=" bg-white dark:text-white shadow-2xl dark:bg-gray-800    p-5 ">
      <div className=" w-[85%] m-auto flex flex-col md:flex-row gap-3 justify-between items-center f">
        <Link to="/notes" className="logo">
          <h3 className="text-2xl flex items-center gap-2  font-bold">
            <LuNotepadText color="aqua" />

            <span className="">NoteApp</span>
          </h3>
        </Link>
        <div className="right">
          <ul className="flex  items-center gap-5">
            <li>
              <NavLink
                to="/notes"
                className="dark:text-white  text-md  hover:bg-[blue] p-2 rounded-md transition-all duration-300">
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
                  className="dark:text-white cursor-pointer text-md  p-2  rounded-md hover:bg-[red] transition-all duration-300">
                  SignOut
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="dark:text-white text-md hover:bg-[blue] p-2 rounded-md transition-all duration-300">
                  Login
                </NavLink>
              )}
            </li>
            {!token ? (
              <li>
                <NavLink
                  to="/register"
                  className="dark:text-white text-md  hover:bg-[blue] p-2 rounded-md transition-all duration-300">
                  Register
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li>
              {theme == "dark" ? <button onClick={toggoleTheme} className="cursor-pointer text-amber-300"><FaSun  size={25} /></button> :
                <button onClick={toggoleTheme} className="cursor-pointer text-gray-800"><FaMoon size={25} /></button>
              }
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
