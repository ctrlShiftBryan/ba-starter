/* eslint-disable consistent-return */
import { ActionFunction, redirect, useActionData } from 'remix';
import { db } from '~/utils/db.server';
import { requireUserId } from '~/utils/session.server';

function validateJokeName(name: string) {
  if (name.length < 3) {
    return 'Joke name must be at least 3 characters long';
  }
}

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return 'Joke content must be at least 10 characters long';
  }
}

type ActionData = {
  formError?: string,
  fieldErrors?: { name?: string, content?: string },
  fields?: { name?: string, content?: string }
}

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');
  if (typeof name !== 'string' || typeof content !== 'string') {
    return {
      formError: 'Form submitted incorrectly',
    };
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content)
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors, fields: { name, content } };
  }
  const fields = { name, content };
  const joke = await db.joke.create({
    data: { ...fields, jokesterId: userId }
  });

  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div className="m-2">
          <label htmlFor="name" className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700">
            Name:
            {' '}
            <input
              type="text"
              defaultValue={actionData?.fields?.name}
              name="name"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.name)
                || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.name
                  ? 'name-error'
                  : undefined
              }
              className="block flex-1 w-full min-w-0 sm:text-sm rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p
              className="py-2 text-xs text-red-400"
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="m-2">
          <label
            htmlFor="content"
            className="block sm:pt-2 sm:mt-px text-sm font-medium text-gray-700"
          >
            Content:
            {' '}
            <textarea
              name="content"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content)
                || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.content
                  ? 'content-error'
                  : undefined
              }
              defaultValue={actionData?.fields?.content}
              className="block w-full max-w-lg sm:text-sm rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="py-2 text-xs text-red-400"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
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
