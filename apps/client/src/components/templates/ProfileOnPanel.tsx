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
    url: "/user"
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile.</div>;
  }

  const profileUser = profile ?? user;

  const firstName = profileUser?.firstName || "Guest";
  const lastName = profileUser?.lastName || "";
  const email = profileUser?.email || "no-email@example.com";

  return (
    <div
      className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 transition"
      title="Profile"
    >
    <span className="bg-blue-500 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center">
      {firstName.charAt(0).toUpperCase()}
    </span>
      <div className="text-sm font-semibold text-gray-800 flex flex-col">
        <span>{firstName} {lastName}</span>
        <span className="text-xs text-gray-500">{email}</span>
      </div>
    </div>
  );

};

export default ProfileOnPanel;