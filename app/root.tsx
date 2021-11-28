import { Joke, User } from '@prisma/client';
import React from 'react';
import {
  Links, LinksFunction, LiveReload, LoaderFunction, Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData
} from 'remix';
import tailwindUrl from '~/styles/app.css';
import SideNav from './components/LeftNav';
import TopNav from './components/TopNav';
import { db } from './utils/db.server';
import { getUser } from './utils/session.server';

// https://remix.run/api/app#links
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindUrl }];

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  const data = useLoaderData<LoaderData>();
  return (
    <Document>
      <Layout data={data}>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export const ErrorBoundary = function ({ error }: { error: Error }) {
  // eslint-disable-next-line no-console
  console.error(error);
  return (
    <Document title="Error!">
      <Layout data={{ user: null, jokeListItems: [] }}>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
};

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export const CatchBoundary = function () {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout data={{ user: null, jokeListItems: [] }}>
        <h1>
          {caught.status}
          :
          {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
};

const Document = function ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const jokeListItems = await db.joke.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true }
  });
  const user = await getUser(request);

  return {
    user,
    jokeListItems
  };
};

type LoaderData = {
  user: User | null;
  jokeListItems: Array<Joke>;
};

const Layout = function ({ children, data }: { children: React.ReactNode, data: LoaderData }) {
  return (
    <div className="flex min-h-full">
      <SideNav jokes={data.jokeListItems} user={data.user} />
      <div className="flex flex-col flex-1 min-h-screen">
        <TopNav />
        <main className="flex-grow">
          {children}
        </main>
        <footer>Footer</footer>
      </div>
    </div>
  );
};
