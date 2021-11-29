/* eslint-disable camelcase */
import {
  ActionFunction, LoaderFunction, redirect, useLoaderData
} from 'remix';

type ActionData = {
  user: any,
  leagueId: string | null
  league: any,
  leagues: { league_id: string, name: string }[],
  points: number,
  formError?: string,
};

export default function Index() {
  return (
    <div className="flex">
      thing
    </div>
  );
}
