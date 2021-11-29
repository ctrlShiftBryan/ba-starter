import { ActionFunction, useActionData } from 'remix';

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  const form = await request.formData();
  const username1 = form.get('username1');
  if (typeof username1 !== 'string') {
    return {
      formError: 'Form submitted incorrectly',
    };
  }
  const fields = { username1 };
  return { fields };
};

type ActionData = {
  fields?: { username1?: string }
  formError?: string,
}

export default function Index() {
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <main>
        <form method="post" action="/matchup?index">
          <label htmlFor="username1">
            <span>User Name 1</span>
            <input
              type="text"
              name="username1"
              defaultValue={actionData?.fields?.username1}
            />
          </label>
        </form>
      </main>
    </div>
  );
}
