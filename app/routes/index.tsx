import type { MetaFunction } from 'remix';

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => ({
  title: 'BA Remix Starter',
  description: 'Welcome to remix!'
});

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div>
      <main>
        <h2>Welcome to BA Starter!</h2>
      </main>
    </div>
  );
}
