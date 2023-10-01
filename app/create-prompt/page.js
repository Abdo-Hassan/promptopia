'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import Form from '@/components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  if (!session || !session.user) {
    redirect('/');
  }

  // Create new prompt
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('createPrompt error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
