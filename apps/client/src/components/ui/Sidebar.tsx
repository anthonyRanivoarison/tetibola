import React from "react";
import {Home, LogOut} from "lucide-react";
import {NavLink} from "react-router-dom";

type NavGroup = {
  title: string;
  items: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
};

type AsideProps = {
  groups: NavGroup[],
  title?: string,
  isOpen: boolean
};

const Sidebar = ({groups, title, isOpen}: AsideProps) => {
  return (
    <aside
      className={`bg-gray-200 border-r border-gray-400 text-black h-screen p-4 flex flex-col justify-between 
      transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
    >
      <div>
        <h2 className="text-2xl mb-4 flex items-center gap-2 dancing-script-font">
          <Home size={24}/>
          {isOpen && <span>{title}</span>}
        </h2>
        <hr className="my-4"/>

        {groups.map((group, idx) => (
          <div key={idx} className="mb-4">
            {isOpen && (
              <h2 className="text-sm font-semibold mb-2 text-gray-800">
                {group.title}
              </h2>
            )}

            <nav className="space-y-2 text-sm">
              {group.items.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.href}
                  title={item.label}
                  className={({isActive}) =>
                    `flex items-center gap-3 px-2 py-2 rounded transition ${
                      isActive
                        ? "bg-black text-white font-semibold shadow"
                        : "hover:bg-gray-300"
                    }`
                  }
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <button
        className="flex items-center gap-2 px-2 py-2 text-red-500 hover:bg-red-100 rounded-md transition duration-150 ease-in-out"
        title="Logout"
      >
        <LogOut size={20} color="red"/>
        {isOpen && <span>Log Out</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
