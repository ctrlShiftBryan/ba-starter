import React from 'react';
import { LoaderFunction, useLoaderData } from 'remix';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { userId2: userId, leagueId2: leagueId } = params;
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
    }),
    params
  };
};
export default function LeagueId2() {
  const actionData = useLoaderData();
  const league = actionData.leagues.find((l: any) => l.league_id === actionData.leagueId);
  const { user, points } = actionData;
  return (
    <div className="flex-1">
      <div>{league?.name }</div>
      <div>{user?.display_name }</div>
      <div>{points}</div>
      <a href={`/matchup/${actionData.params.userId}/${actionData.params.leagueId}`}>Change</a>
    </div>
  );
}
