/* eslint-disable camelcase */

import { LoaderFunction, redirect, useLoaderData } from 'remix';

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const leagueId2 = url.searchParams.get('leagueid1');

  const { userId, userId2, leagueId } = params;

  if (leagueId2) {
    return redirect(`/matchup/${userId}/${leagueId}/${userId2}/${leagueId2}`);
  }

  const url2 = `https://api.sleeper.app/v1/user/${userId2}/leagues/nfl/2021`;
  const res = await fetch(url2);
  const leagues = await res.json();
  return { leagues };
};

export default function Index() {
  const actionData = useLoaderData();
  return (
    <form id="leagueidform">
      <label htmlFor="leagueid1">
        <select name="leagueid1" form="leagueidform">
          {
            actionData.leagues.map((l) => <option key={l.league_id} value={l.league_id}>{l.name}</option>)
          }
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
