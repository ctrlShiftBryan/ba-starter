import { Joke } from '@prisma/client';
import {
  LoaderFunction, useCatch, useLoaderData, useParams
} from 'remix';
import { db } from '~/utils/db.server';

type LoaderData = { joke: Joke | null}

export const loader: LoaderFunction = async ({ params }) => {
  // throw new Error('whoops');
  const joke = await db.joke.findUnique({
    where: {
      id: params.jokeId
    }
  });
  if (!joke) {
    throw new Response('What a joke! Not found.', {
      status: 404
    });
  }
  return { joke };
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
export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="p-3 m-2 text-red-500 bg-red-300">
        Huh? What the heck is "
        {params.jokeId}
        "?
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
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
