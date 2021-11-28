import { Outlet } from 'remix';

export default function JokesRoute() {
  return (
    <div className="m-2 text-lg text-indigo-900">
      <h1>J🤪KES</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
