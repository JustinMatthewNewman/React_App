import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const MyProfile = () => {
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
      <h1>My Profile</h1>
      <img src={user.image} alt="Profile" />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default MyProfile;
