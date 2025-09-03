import React from "react";

interface SidebarProps {
  items: { label: string; href: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({items}) => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-4 py-6 text-xl font-bold border-b border-gray-700">
        My App
      </div>
      <nav className="flex-1 px-4 py-2 space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-lg hover:bg-gray-700"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};
