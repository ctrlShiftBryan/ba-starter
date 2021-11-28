import { ActionFunction, redirect } from 'remix';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');
  if (typeof name !== 'string' || typeof content !== 'string') {
    return {
      status: 400,
      body: 'Invalid name or content'
    };
  }
  const joke = await db.joke.create({
    data: {
      name, content
    }
  });

  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div className="m-2">
          <label htmlFor="name" className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700">
            Name:
            {' '}
            <input type="text" name="name" className="block flex-1 w-full min-w-0 sm:text-sm rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
          </label>
        </div>
        <div className="m-2">
          <label htmlFor="content" className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700">
            Content:
            {' '}
            <textarea name="content" className="block w-full max-w-lg sm:text-sm rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" />
          </label>
        </div>
        <div className="m-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
