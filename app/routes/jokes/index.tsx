import { Joke } from '@prisma/client';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';

type LoaderData = { randomJoke: Joke };

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber
  });
  const data: LoaderData = { randomJoke };
  return data;
};
export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="m-1">
      <p>Here's a random joke:</p>
      <p className="mb-4">{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id} className="p-2 text-white bg-indigo-700 rounded">
        "
        {data.randomJoke.name}
        " Permalink
      </Link>
    </div>
  );
}
