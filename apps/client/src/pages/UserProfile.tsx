
import React from "react";
import { Edit, LogOut, AlertTriangle } from "lucide-react";
import { useFetch } from "../hooks/api.tsx";
import { useLogout } from "../hooks/logout.ts";

interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  creationDate?: string;
}

const UserProfile: React.FC = () => {
  const logout = useLogout();
  
  const {
    data: user,
    error,
    isLoading
  } = useFetch<User>({
    url: "/user",
    method: "GET",
    keys: ["profile", "user"]
  });
  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  }
  
  if (error || !user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg flex items-center gap-2 shadow">
          <AlertTriangle className="w-5 h-5" />
          <span>
            Error loading profile : {error ? String(error) : "User no found"}
          </span>
        </div>
      </div>
    );
  }
  
  const firstName = user.firstName ?? "Guest";
  const lastName = user.lastName ?? "";
  const email = user.email ?? "no-email@example.com";
  const avatarLetter = firstName.charAt(0).toUpperCase();
  
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Bandeau supérieur */}
        <div className="relative h-32 bg-gradient-to-r from-orange-500 via-yellow-300 to-blue-500 opacity-60">
          <div
            className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-blue-600 text-white font-bold text-4xl flex items-center justify-center border-4 border-white shadow-lg"
            aria-label="User Avatar"
            >
            {avatarLetter}
          </div>
        </div>

        {/* Contenu */}
        <div className="px-8 pb-8 mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500">{email}</p>
          {user.creationDate && (
            <p className="text-xs text-gray-400">
              Member since {new Date(user.creationDate).toLocaleDateString()}
            </p>
          )}

          {/* Boutons */}
          <div className="flex gap-3 mt-6 justify-center">
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              aria-label="Modifier le profil"
              >
              <Edit className="w-4 h-4" />
              Modified
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
              aria-label="Déconnexion"
              >
              <LogOut className="w-4 h-4" />
              Log out 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
