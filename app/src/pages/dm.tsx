import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const DM = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }
//   if (!session) {
//     router.push("/login");
//   }

//   const user = session?.user;

  return (
    <div>
      <h1 className="h-screen">DM's coming soon</h1>
      {/* <img src={user?.image} alt="Profile" /> */}
    </div>
  );
};

export default DM;
