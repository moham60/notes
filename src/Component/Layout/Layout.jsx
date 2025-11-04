import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
