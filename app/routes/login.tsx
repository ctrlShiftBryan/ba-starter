/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ActionFunction, LoaderFunction, MetaFunction, redirect, useActionData, useSearchParams
} from 'remix';
import { db } from '~/utils/db.server';
import {
  createUserSession, getUser, login, register
} from '~/utils/session.server';

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
  };
};

function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Usernames must be at least 3 characters long';
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Passwords must be at least 6 characters long';
  }
}

export const action: ActionFunction = async ({
  request
}): Promise<Response | ActionData> => {
  const form = await request.formData();
  const loginType = form.get('loginType');
  const username = form.get('username');
  const password = form.get('password');
  const redirectTo = form.get('redirectTo');
  if (
    typeof loginType !== 'string'
    || typeof username !== 'string'
    || typeof password !== 'string'
    || typeof redirectTo !== 'string'
  ) {
    return { formError: 'Form not submitted correctly.' };
  }

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password)
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  switch (loginType) {
    case 'login': {
      const user = await login({ username, password });
      if (!user) {
        return {
          fields,
          formError: 'Username/Password combination is incorrect'
        };
      }
      return createUserSession(user.id, redirectTo);
    }
    case 'register': {
      const userExists = await db.user.findFirst({
        where: { username }
      });
      if (userExists) {
        return {
          fields,
          formError: `User with username ${username} already exists`
        };
      }
      const user = await register({ username, password });
      if (!user) {
        return {
          fields,
          formError: 'Something went wrong trying to create a new user.'
        };
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return { fields, formError: 'Login type invalid' };
    }
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user !== null) {
    return redirect('/jokes');
  }
  return null;
};

export default function Login() {
  const actionData = useActionData<ActionData | undefined>();
  const [searchParams] = useSearchParams();
  return (
    <div className="p-2 m-5 bg-white rounded border shadow">
      <div>
        <h1 className="text-3xl font-extrabold text-center text-indigo-900">Login</h1>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={
              searchParams.get('redirectTo') ?? undefined
            }
          />
          <fieldset className="m-2 text-center">
            <legend className="sr-only">
              Login or Register?
            </legend>
            <label htmlFor="login" className="sm:p-2 sm:mt-px text-sm font-medium text-gray-700">
              <input
                id="login"
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType
                  || actionData?.fields?.loginType === 'login'
                }
              />
              {' '}
              Login
            </label>
            <label htmlFor="register" className="sm:p-2 sm:mt-px text-sm font-medium text-gray-700">
              <input
                id="register"
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={
                  actionData?.fields?.loginType
                  === 'register'
                }
              />
              {' '}
              Register
            </label>
          </fieldset>
          <div className="m-2">
            <label htmlFor="username" className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={actionData?.fields?.username}
              className="block flex-1 w-full min-w-0 sm:text-sm rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              aria-invalid={Boolean(
                actionData?.fieldErrors?.username
              )}
              aria-describedby={
                actionData?.fieldErrors?.username
                  ? 'username-error'
                  : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <p
                className="py-2 text-xs text-red-400"
                role="alert"
                id="username-error"
              >
                {actionData?.fieldErrors.username}
              </p>
            ) : null}
          </div>
          <div className="m-2">
            <label htmlFor="password" className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              defaultValue={actionData?.fields?.password}
              type="password"
              className="block flex-1 w-full min-w-0 sm:text-sm rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              aria-invalid={
                Boolean(
                  actionData?.fieldErrors?.password
                ) || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.password
                  ? 'password-error'
                  : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="py-2 text-xs text-red-400"
                role="alert"
                id="password-error"
              >
                {actionData?.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p
                className="py-2 m-2 text-xs text-red-400"
                role="alert"
              >
                {actionData?.formError}
              </p>
            ) : null}
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 m-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => ({
  title: 'Remix Jokes | Login',
  description:
      'Login to submit your own jokes to Remix Jokes!'
});
