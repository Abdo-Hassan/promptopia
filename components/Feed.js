'use client';
import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import Loading from '@/app/loading';
import NoData from './NoData';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [loadingPrompts, setLoadingPrompts] = useState(false);
  const [prompts, setPrompts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagValue) => {
    setSearchText(tagValue);
  };

  const filteredPrompts = prompts.filter(
    (p) =>
      p.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      p.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
      p.creator.email.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setLoadingPrompts(true);
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      if (response.status === 200) {
        setLoadingPrompts(false);
        setPrompts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          autoFocus
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {loadingPrompts ? (
        <Loading />
      ) : filteredPrompts?.length > 0 ? (
        <div className='mt-16 prompt_layout'>
          {filteredPrompts?.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default Feed;
