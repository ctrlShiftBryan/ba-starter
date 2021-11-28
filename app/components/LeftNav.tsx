import { useLocation } from 'react-router-dom';
import { Link } from 'remix';

type IndexData = {
  demos: Array<{ name: string; to: string, current: boolean }>;
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SideNav() {
  const location = useLocation();
  const data: IndexData = {
    demos: [
      {
        to: '/jokes',
        name: 'Jokes',
        current: false
      },

      {
        to: '/jokes/new',
        name: 'New Joke',
        current: false
      },
    ].map((l) => ({ ...l, current: location.pathname === l.to }))
  };
  return (
    <div className="hidden w-64 bg-indigo-200 sm:block">
      <ul className="flex-1 px-2 mt-5 space-y-1">
        {data.demos.map((demo) => (
          <li key={demo.to} className="remix__page__resource">
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
