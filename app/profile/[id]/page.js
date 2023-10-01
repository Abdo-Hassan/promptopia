'use client';

import Loading from '@/app/loading';
import Profile from '@/components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }) => {
  const userId = params.id;
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

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
      profileName={userName}
      desc={`Welcome to ${userName} personalized profile page , Explore ${userName}'s exceptional  prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default UserProfile;
