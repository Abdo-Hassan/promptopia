import Image from 'next/image';
import React from 'react';

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={prompt.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3>{prompt.creator.username}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
