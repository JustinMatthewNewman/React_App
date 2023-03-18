import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from "../components/Header";


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
              {/* Header */}
      <Header />
      <h1 className="h-screen mt-16 p-10">DM's coming soon</h1>
      {/* <img src={user?.image} alt="Profile" /> */}
    </div>
  );
};

export default DM;
