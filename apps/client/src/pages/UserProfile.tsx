import React, {useState, type ChangeEvent, type FormEvent} from "react";
import {Edit, LogOut, Check} from "lucide-react";
import {useFetch} from "../hooks/api.tsx";
import {useLogout} from "../hooks/logout.ts";
import {api} from "../api/base";

interface User {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  creationDate?: string;
}

const ProfileUpdateModal: React.FC<{ user: User; onClose: () => void; onUpdate: (u: User) => void }> = ({
                                                                                                          user,
                                                                                                          onClose,
                                                                                                          onUpdate,
                                                                                                        }) => {
  const [form, setForm] = useState({
    firstName: user.first_name || "",
    lastName: user.last_name || "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await api.put("/user/", form, {withCredentials: true});
      setStatus("success");
      setMessage("Profile updated successfully!");
      onUpdate(res.data);
      setTimeout(onClose, 1000);
    } catch (err: any) {
      console.log("error", err);
      setStatus("error");
      setMessage(err?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm pointer-events-auto transition-opacity"
      />

      <div
        className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10 pointer-events-auto animate-fadeInScale">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Edit className="w-5 h-5 text-blue-500"/> Update Profile
        </h3>

        {message && (
          <p className={`mb-2 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4"/> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const UserProfile: React.FC = () => {
  const logout = useLogout();
  const {data: user, error, isLoading} = useFetch<User>({
    url: "/user",
    method: "GET",
    keys: ["profile", "user"],
  });

  console.log(user)

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!currentUser) return null;

  const firstName = currentUser.first_name || "Guest";
  const lastName = currentUser.last_name || "";
  const email = currentUser.email || "no-email@example.com";
  const avatarLetter = firstName.charAt(0).toUpperCase();

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-orange-500 via-yellow-300 to-blue-500 opacity-50">
          <div
            className="absolute bottom-[-3rem] left-1/10 transform -translate-x-1/2 w-24 h-24 rounded-full bg-blue-600 text-white font-bold text-4xl flex items-center justify-center border-4 border-white shadow-lg"
          >
            {avatarLetter}
          </div>
        </div>
        <div className="px-8 pb-8 mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500">{email}</p>
          {currentUser.creationDate && (
            <p className="text-xs text-gray-400">
              Member since {new Date(currentUser.creationDate).toLocaleDateString()}
            </p>
          )}

          <div className="flex gap-3 mt-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Edit className="w-4 h-4"/> Edit Profile
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
            >
              <LogOut className="w-4 h-4"/> Logout
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && currentUser && (
        <ProfileUpdateModal
          user={currentUser}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(u) => setCurrentUser(u)}
        />
      )}
    </div>
  );
};

export default UserProfile;
