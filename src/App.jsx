import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Bounce, ToastContainer } from "react-toastify";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import Notes from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import Authunticated from "./Component/Authunticated/Authunticated";
import { Note } from './Pages/NoteDetails/NoteDetails';
import ThemeProvider from "./Context/ThemeContext/ThemeProvider";
const client = new QueryClient({});
const route = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/notes",
        element: (
          <Authunticated>
            <Notes />
          </Authunticated>
        ),
      },
       {
        path: "/Note/:id",
        element: (
          <Authunticated>
            <Note/>
          </Authunticated>
        ),
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
<AuthProvider>
        <RouterProvider router={route}></RouterProvider>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      </ThemeProvider>
      
    </QueryClientProvider>
  );
}

export default App;
