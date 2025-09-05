interface UserProfile {
  firstName: string;
  lastName?: string;
  email: string;
}

interface ProfileOnPanelProps {
  user: UserProfile;
}

const ProfileOnPanel = ({user}: ProfileOnPanelProps) => {
  return (
    <div
      className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 transition"
      title="Profile"
    >
      <span className="bg-blue-500 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center">
        {user.firstName.charAt(0).toUpperCase()}
      </span>
      <div className="text-sm font-semibold text-gray-800 flex flex-col">
        <span>{user.firstName} {user.lastName}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
    </div>
  );
};

export default ProfileOnPanel;
