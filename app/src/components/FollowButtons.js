import { useState } from "react";
import { useSession } from "next-auth/react"


const FollowButtons = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const {data: session} = useSession();


  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`bg-purple-500 text-white font-bold py-2 px-4 rounded-md ${
          isFollowing ? "bg-gray-300 text-white cursor-default" : ""
        }`}
        onClick={handleFollowClick}
        disabled={isFollowing}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
      <button className="bg-white text-gray-500 font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-100">
        Message
      </button>
      <button
        className="bg-white text-gray-500 font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-100"
        onClick={() => window.open(`mailto:${session?.user?.email}`)}
      >
        Email
      </button>
    </div>
  );
};

export default FollowButtons;
