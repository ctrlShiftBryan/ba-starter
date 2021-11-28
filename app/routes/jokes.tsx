import { Link, LoaderFunction, Outlet } from 'remix';
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
          <div className="jokes-list">
          </div>

          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
