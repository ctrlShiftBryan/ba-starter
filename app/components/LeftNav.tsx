import { Joke, User } from '@prisma/client';
import { useLocation } from 'react-router-dom';
import { Link } from 'remix';

type IndexData = {
  demos: Array<{ name: string; to: string, current: boolean }>;
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  jokes: Joke[];
  user: User | null;
}

export default function SideNav({ jokes, user }: Props) {
  const location = useLocation();
  const data: IndexData = {
    demos: [
      {
        to: '/jokes',
        name: 'Jokes',
        current: false
      },
      ...jokes.map((joke) => ({
        to: `/jokes/${joke.id}`,
        name: joke.name,
        current: false
      })),
      {
        to: '/jokes/new',
        name: 'New Joke',
        current: false
      },

      {
        to: '/jokes ',
        name: 'Random Joke',
        current: false
      },
    ].map((l) => ({ ...l, current: location.pathname === l.to }))
  };
  return (
    <div className="hidden sm:block w-64 bg-indigo-200">
      <ul className="flex-1 px-2 mt-5 space-y-1">
        {user ? (
          <div className="flex">
            <span>{`Hi ${user.username}`}</span>
            <form action="/logout" method="post">
              <button
                type="submit"
                className="inline-flex justify-center py-1 px-1 ml-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {data.demos.map((demo) => (
          <li key={demo.to}>
            <Link
              to={demo.to}
              prefetch="intent"
              className={classNames(
                demo.current ? 'bg-indigo-800 text-white' : 'text-indigo-800 hover:bg-white hover:bg-opacity-75',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              {demo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
