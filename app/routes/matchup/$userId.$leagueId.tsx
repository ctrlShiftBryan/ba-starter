/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import {
  ActionFunction, LoaderFunction, Outlet, redirect, useLoaderData
} from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
  const { userId, leagueId } = params;
  const url2 = `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2021`;
  const res = await fetch(url2);
  const leagues = await res.json();
  const league = leagues.find((l: any) => l.league_id === leagueId);
  const url3 = `https://api.sleeper.app/v1/league/${leagueId}/rosters`;
  const res2 = await fetch(url3);
  const rosters = await res2.json();
  const roster = rosters.find((r: any) => r.owner_id === userId);
  const { roster_id: rosterId } = roster;

  const url4 = 'https://api.sleeper.app/v1/state/nfl';
  const res3 = await fetch(url4);
  const { week } = await res3.json();

  const url5 = `https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`;
  const res4 = await fetch(url5);
  const matchups = await res4.json();

  const url6 = `https://api.sleeper.app/v1/league/${leagueId}/users`;
  const res5 = await fetch(url6);
  const users = await res5.json();

  const user = users.find((u: any) => u.user_id === userId);
  const matchup = matchups.find((m: any) => m.roster_id === rosterId);
  const { points } = matchup;
  return {
    rosterId,
    user,
    points,
    leagueId,
    league,
    leagues: leagues.map((l: any) => {
      const { name, league_id } = l;
      return { name, league_id };
    })
  };
};
type ActionData = {
  user: any,
  leagueId: string | null
  league: any,
  leagues: { league_id: string, name: string }[],
  points: number,
  formError?: string,
};

export const action: ActionFunction = async ({ request, params }): Promise<Response | any> => {
  const form = await request.formData();
  const username1 = form.get('username2');
  if (typeof username1 !== 'string') {
    return {
      formError: 'Form submitted incorrectly',
      user: null,
      leagueId: null,
      league: null,
      leagues: [],
      points: 0,

    };
  }
  const url = `https://api.sleeper.app/v1/user/${username1}`;
  const res = await fetch(url);
  const user = await res.json();

  const { userId, leagueId } = params;
  const userId2 = user.user_id;
  if (userId2) {
    return redirect(`/matchup/${userId}/${leagueId}/${userId2}`);
  }
};

export default function Index() {
  const actionData = useLoaderData<ActionData>();
  const league = actionData.leagues.find((l) => l.league_id === actionData.leagueId);
  const { user, points } = actionData;
  return (
    <>
      <div className="flex-1">
        <div>
          <div>{league?.name }</div>
          <div>{user?.display_name }</div>
          <div>{points}</div>
        </div>

      </div>

      <Outlet />
    </>
  );
}
