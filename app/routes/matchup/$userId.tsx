/* eslint-disable camelcase */
import { LoaderFunction, redirect, useLoaderData } from 'remix';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { userId } = params;
  const url = new URL(request.url);
  const leagueId = url.searchParams.get('leagueid1');
  const url2 = `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2021`;
  const res = await fetch(url2);
  const leagues = await res.json();

  if (leagueId) {
    return redirect(`/matchup/${userId}/${leagueId}`);
  }

  return {
    leagueId,
    leagues: leagues.map((l: any) => {
      const { name, league_id } = l;
      return { name, league_id };
    })
  };
};
type ActionData = {
  leagueId: string | null
  leagues: { league_id: string, name: string }[],
};
export default function Index() {
  const actionData = useLoaderData<ActionData>();
  console.log({ actionData });
  return (
    <form id="leagueidform">
      <label htmlFor="leagueid1">
        <select name="leagueid1" form="leagueidform">
          {
            actionData.leagues.map((l) => <option key={l.league_id} value={l.league_id}>{l.name}</option>)
          }
        </select>
      </label>
      <input type="submit" className="hidden" />
    </form>
  );
}
