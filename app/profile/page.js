'use client';

import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user.id;

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
          const filteredPosts = posts.filter((p) => p._id !== post.id);
          setPosts(filteredPosts);
          if (response.status === 200) router.push('/');
        });
      } catch (error) {
        console.log('handleDelete error:', error);
      }
    }
  };

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
