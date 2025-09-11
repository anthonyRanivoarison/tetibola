import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLogout} from "../../../hooks/logout.ts";
import {api} from "../../../api/base.ts";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const res = await api.get("/user", {withCredentials: true});
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = useLogout();

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-lg px-6 py-3 flex items-center justify-between w-[90%] max-w-2xl"
    >
      <div className="text-xl font-bold text-blue-600">
        Tetibola
      </div>

      <div className="flex items-center gap-6">
        {isAuthenticated === null ? (
          <span className="text-gray-400">Loading...</span>
        ) : isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
