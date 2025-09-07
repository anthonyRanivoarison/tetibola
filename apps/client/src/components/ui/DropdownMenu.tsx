import {useState} from "react";
import {SlidersVertical, type LucideIcon} from "lucide-react";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
}

export const DropdownMenu = ({title, items}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="inline-flex justify-center items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <SlidersVertical size={16}/> {title}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          onMouseLeave={closeMenu}
        >
          <div className="py-1">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={closeMenu}
                >
                  {Icon && <Icon size={16}/>}
                  {item.label}
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick?.();
                    closeMenu();
                  }}
                  className="flex items-center gap-2 w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {Icon && <Icon size={16}/>}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
