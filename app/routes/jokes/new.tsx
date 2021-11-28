export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div className="m-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Name:
            {' '}
            <input type="text" name="name" className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm" />
          </label>
        </div>
        <div className="m-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Content:
            {' '}
            <textarea name="content" className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </label>
        </div>
        <div className="m-2">
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
