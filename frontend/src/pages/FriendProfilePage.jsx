import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { User, Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const FriendProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [friendProfile, setFriendProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/auth/profile/${userId}`);
        setFriendProfile(res.data);
      } catch (error) {
        console.error("Error fetching friend profile:", error);
        toast.error("Failed to load profile");
        navigate("/"); // Redirect if profile fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchFriendProfile();
    }
  }, [userId, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Profile not found
  if (!friendProfile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-error">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-base-content/70 hover:text-base-content transition-colors mb-4"
        >
          <ArrowLeft className="size-5" />
          <span>Back</span>
        </button>

        <div className="bg-gray-900 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-gray-400">User Information</p>
          </div>

          {/* Avatar section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={friendProfile.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              />
            </div>
            <h2 className="text-xl font-medium">{friendProfile.fullName}</h2>
          </div>

          {/* User info section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-800 rounded-lg border border-gray-700">
                {friendProfile.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-800 rounded-lg border border-gray-700">
                {friendProfile.email}
              </p>
            </div>
          </div>

          {/* Account Information section */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Member Since</span>
                <span>
                  {new Date(friendProfile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfilePage;
