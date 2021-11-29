import { ActionFunction, redirect, useActionData } from 'remix';

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  const form = await request.formData();
  const username1 = form.get('username1');
  if (typeof username1 !== 'string') {
    return {
      formError: 'Form submitted incorrectly',
    };
  }
  const fields = { username1 };
  const url = `https://api.sleeper.app/v1/user/${username1}`;
  const res = await fetch(url);
  const user = await res.json();
  const userId = user.user_id;
  if (userId) {
    return redirect(`/matchup/${userId}`);
  }
  return { fields: { ...fields, userId } };
};

type ActionData = {
  fields?: { username1?: string, userId?: string };
  formError?: string,
}

export default function Index() {
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <main>
        <form method="post" action="/matchup?index" className="flex flex-col text-left">
          <label htmlFor="username1">
            <span>Enter the first sleeper user id</span>
            <br />
            <input
              type="text"
              name="username1"
              id="username1"
              defaultValue={actionData?.fields?.username1}
            />
          </label>
          <button type="submit">Ok</button>
        </form>
      </main>
    </div>
  );
}
