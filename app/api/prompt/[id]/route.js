// Get
import Prompt from '@/models/prompt';
import { connectToDB } from '@/utils/database';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) {
      return new Response('Prompt not found', {
        status: 404,
      });
    } else {
      return new Response(
        JSON.stringify(prompt, {
          status: 200,
        })
      );
    }
  } catch (error) {
    console.log('GET error:', error);
    return new Response('Failed to fetch all prompts', {
      status: 500,
    });
  }
};

// Patch [Update]
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response('Prompt not found', {
        status: 404,
      });
    } else {
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
      return new Response(
        JSON.stringify(existingPrompt, {
          status: 200,
        })
      );
    }
  } catch (error) {
    console.log('PATCH error:', error);
    return new Response('Failed to update the prompt', {
      status: 500,
    });
  }
};

// Delete
export const Delete = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response('prompt deleted successfully  ', {
      status: 500,
    });
  } catch (error) {
    console.log('DELETE error:', error);
    return new Response('Failed to delete the prompt', {
      status: 500,
    });
  }
};
