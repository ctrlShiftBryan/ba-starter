import type { Joke } from '@prisma/client';
import {
  ActionFunction,
  LoaderFunction, MetaFunction, redirect, useCatch, useLoaderData, useParams
} from 'remix';
import { db } from '~/utils/db.server';
import { getUserId, requireUserId } from '~/utils/session.server';

type LoaderData = { joke: Joke | null, isOwner: boolean };

export const loader: LoaderFunction = async ({ params, request }) => {
  // throw new Error('whoops');
  const userId = await getUserId(request);

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
  return { joke, isOwner: userId === joke.jokesterId };
};

export const action: ActionFunction = async ({
  request,
  params
// eslint-disable-next-line consistent-return
}) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const userId = await requireUserId(request);
    const joke = await db.joke.findUnique({
      where: { id: params.jokeId }
    });
    if (!joke) {
      throw new Response(
        "Can't delete what does not exist",
        { status: 404 }
      );
    }
    if (joke.jokesterId !== userId) {
      throw new Response(
        "Pssh, nice try. That's not your joke",
        {
          status: 401
        }
      );
    }
    await db.joke.delete({ where: { id: params.jokeId } });
    return redirect('/jokes');
  }
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
      {data.isOwner ? (
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          >
            Delete

          </button>
        </form>
      ) : null}
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is
          {' '}
          {params.jokeId}
          ?
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but
          {' '}
          {params.jokeId}
          {' '}
          is not your joke.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
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
export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: 'No joke',
      description: 'No joke found'
    };
  }
  return {
    title: `"${data.joke?.name}" joke`,
    description: `Enjoy the "${data.joke?.name}" joke and much more`
  };
};
