import React, {type ReactNode} from "react";
import {LogOut} from "lucide-react";
import {NavLink} from "react-router-dom";

interface SidebarItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({title, items}) => {
  return (
    <aside className="w-64 bg-gray-200 border-r border-gray-400 text-black h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-6 dancing-script-font">{title}</h2>

        <nav className="space-y-2">
          {items.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.href}
              className={({isActive}) =>
                `flex items-center text-sm gap-3 px-4 py-2 rounded transition ${
                  isActive
                    ? "bg-black text-white font-semibold shadow"
                    : "hover:bg-gray-300"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-500 hover:bg-red-100 rounded-md transition duration-150 ease-in-out"
      >
        <LogOut size={20} color="red"/>
        Log Out
      </button>
    </aside>
  );
};
