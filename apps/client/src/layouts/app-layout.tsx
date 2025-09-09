import {Outlet} from "react-router-dom";
import AppSidebar from "../components/templates/app-sidebar";
import {PanelLeft, Bell} from "lucide-react";
import ProfileOnPanel from "../components/templates/ProfileOnPanel.tsx";
import {useEffect, useState} from "react";

const DefaultAppLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-open");
    if (stored !== null) {
      setIsOpen(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-open", String(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const user = {
    firstName: "Bryan",
    email: "bryan@gmail.com"
  }

  return (
    <div className="flex w-full max-h-screen">
      <AppSidebar isOpen={isOpen}/>

      <main className="flex-1 min-h-screen flex flex-col bg-gray-50">
        <div className="bg-white flex items-center justify-between px-6 py-2 shadow">
          <div className="flex items-center gap-2 text-gray-700 font-medium capitalize">
            <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100">
              <PanelLeft size={20} className="text-gray-500 cursor-pointer"/>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <Bell size={21} className="text-gray-600"/>
              <span
                className="absolute top-1 right-1 bg-red-500 text-[10px] text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            <ProfileOnPanel user={user}/>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default DefaultAppLayout;
