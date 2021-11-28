import { LoaderFunction, Outlet } from 'remix';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  const jokes = await db.joke.findMany();
  return jokes;
};

export default function JokesRoute() {
  return (
    <div className="m-2 text-lg text-indigo-900">
      <h1>J🤪KES</h1>
      <main>
        <div className="container">
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
