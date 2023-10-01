import Prompt from '@/models/prompt';
import { connectToDB } from '@/utils/database';

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, tag, prompt });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.log('POST error:', error);
    return new Response('Failed to create the new prompt', {
      status: 5000,
    });
  }
};
