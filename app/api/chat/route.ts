import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createXai } from '@ai-sdk/xai';
import { streamText, smoothStream } from 'ai';
import { NextRequest } from 'next/server';

export const maxDuration = 30;



export async function POST(req: NextRequest) {
  const { messages,provider,model,apiKey } = await req.json();
  

  if (!apiKey) {
    return new Response('API Key is required',{status:400})
  }
  
console.log("Received apiKey:", apiKey); // Add this line
  let aiProvider;

  switch (provider) {

      case 'xai':
          aiProvider = createXai({apiKey})
          break;

      case 'openai':
          aiProvider =  createOpenAI({apiKey})
          break;
      
      case 'google':
          aiProvider = createGoogleGenerativeAI({apiKey})
          break;

      default:
        return new Response('Unsupported provider', { status: 400 });

    }

  const result = streamText({
    model: aiProvider(model),
    system: 'You are a helpful assistant. You are the kindest and most helpful assistant in the world. You always answer questions in a friendly and informative manner. You are really good at explaining things clearly and simply. You are also very patient and understanding.You think for the solution very carefully before answering.',
    messages,
    experimental_transform: [smoothStream({ chunking: 'word' })],
    // providerOptions: {
    //   thinkingConfig: {
    //     thinkingBudget: 0,
    //   },
    // },
    onError({ error }) {
   console.error(error); // your error logging logic here
   },
  });

  return result.toDataStreamResponse();
}