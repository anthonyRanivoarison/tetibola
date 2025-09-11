import {useFetch} from "../../hooks/api.tsx";

interface UserProfile {
  firstName: string;
  lastName?: string;
  email: string;
}

interface ProfileOnPanelProps {
  user: UserProfile;
}

const ProfileOnPanel = ({user}: ProfileOnPanelProps) => {
  const {data: profile, error, isLoading} = useFetch({
    method: "GET",
    url: "/user",
  });

  if (isLoading) {
    return <div className="text-gray-400 text-sm">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error loading profile</div>;
  }

  const profileUser = profile ?? user;

  const firstName = profileUser?.firstName || "Guest";
  const lastName = profileUser?.lastName || "";
  const email = profileUser?.email || "no-email@example.com";

  return (
    <div
      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 hover:shadow-sm transition cursor-pointer"
      title="Profile"
    >
      <div className="relative">
        <span
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center text-lg shadow">
          {firstName.charAt(0).toUpperCase()}
        </span>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-800">
          {firstName} {lastName}
        </span>
        <span className="text-xs text-gray-500 truncate max-w-[140px]">
          {email}
        </span>
      </div>
    </div>
  );
};

export default ProfileOnPanel;
