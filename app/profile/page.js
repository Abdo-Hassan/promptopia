'use client';

import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { redirect } from 'next/navigation';

const MyProfile = () => {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    setLoadingPosts(true);
    const fetchUsers = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      if (response.status === 200) {
        setLoadingPosts(false);
        setPosts(data);
      }
    };

    if (userId) fetchUsers();
  }, [userId]);

  return loadingPosts ? (
    <Loading />
  ) : (
    <Profile
      profileName='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
