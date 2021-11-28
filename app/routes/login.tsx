/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSearchParams } from 'remix';

export default function Login() {
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
                defaultChecked
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
              className="block flex-1 w-full min-w-0 sm:text-sm rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="m-2">
            <label htmlFor="password" className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="block flex-1 w-full min-w-0 sm:text-sm rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 m-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
