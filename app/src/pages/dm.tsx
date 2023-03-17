import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const DM = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const { user } = session;

  return (
    <div>
      <h1>DM's</h1>
      <img src={user.image} alt="Profile" />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default DM;
