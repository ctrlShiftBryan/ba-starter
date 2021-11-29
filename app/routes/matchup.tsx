import { Outlet } from 'remix';

export default function JokesRoute() {
  return (
    <div className="m-2 text-lg text-indigo-900">
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
