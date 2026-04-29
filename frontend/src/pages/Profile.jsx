import { Camera, Mail, Pencil, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const Profile = () => {
  const [fullname, setFullname] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { auth, isUpdateProfile, updateProfile } = useAuthStore();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleSaveName = async () => {
    if (!fullname.trim() || fullname === auth.fullname) {
      setIsEditingName(false);
      return;
    }
    await updateProfile({ fullname: fullname.trim() });
    setIsEditingName(false);
  };

  const handleEditName = () => {
    setFullname(auth.fullname);
    setIsEditingName(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || auth.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                    absolute bottom-0 right-0 
                    bg-base-content hover:scale-105
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200
                    ${isUpdateProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImage}
                  disabled={isUpdateProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdateProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={isEditingName ? fullname : auth?.fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  readOnly={!isEditingName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveName();
                    if (e.key === "Escape") setIsEditingName(false);
                  }}
                  className={`w-full px-4 py-2.5 bg-base-200 rounded-lg border transition-all duration-200 ${isEditingName ? "border-primary outline-none" : "cursor-default"}`}
                />

                {!isEditingName && (
                  <button
                    onClick={handleEditName}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditingName && (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveName}
                    disabled={isUpdateProfile}
                    className="btn btn-primary btn-sm"
                  >
                    {isUpdateProfile ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {auth?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{auth.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
