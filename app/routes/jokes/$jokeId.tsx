import { Joke } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';

type LoaderData = { joke: Joke | null}

export const loader: LoaderFunction = async ({ params }) => {
  // throw new Error('whoops');
  const data: LoaderData = {
    joke:
   await db.joke.findUnique({
     where: {
       id: params.jokeId
     }
   })
  };
  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>
        {
          data.joke?.content
        }
      </p>
    </div>
  );
}

export const ErrorBoundary = function ({ error }: { error: Error }) {
  // eslint-disable-next-line no-console
  console.error(error);
  return (
    <div className="p-2 m-2 text-white bg-red-500 border border-red-500">
      <h1>There was an error</h1>
      <div className="p-2 text-red-500 bg-white">
        <p>{error.message}</p>
      </div>
    </div>
  );
};
