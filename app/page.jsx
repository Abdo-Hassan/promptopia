import Feed from '@/components/Feed';
import React from 'react';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      {/* header title */}
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-Powered Prompt</span>
      </h1>

      {/* desc */}
      <p className='desc text-center'>
        Promtopia is an open-source AI prompting tool for modern world to
        discover , create and share creative prompts
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
