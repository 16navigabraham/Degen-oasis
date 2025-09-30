import { Crown, Medal, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLeaderboard } from '@/lib/data';

function RankIcon({ rank }: { rank: number }) {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-amber-400" />;
    case 2:
      return <Medal className="h-5 w-5 text-slate-400" />;
    case 3:
      return <Trophy className="h-5 w-5 text-amber-700" />;
    default:
      return <span className="text-sm font-mono w-5 text-center">{rank}</span>;
  }
}

export default function ReactionLeaderboard() {
  const leaderboard = getLeaderboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary text-xl text-center">
          Top Degens
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard.length > 0 ? (
          <ul className="space-y-3">
            {leaderboard.map(({ rank, address, count }) => (
              <li key={address} className="flex items-center justify-between gap-4 p-2 rounded-md transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <RankIcon rank={rank} />
                  <span className="font-mono text-sm">
                    {`${address.slice(0, 6)}...${address.slice(-4)}`}
                  </span>
                </div>
                <div className="font-mono text-base font-medium text-primary">
                  {count}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground text-sm">
            Be the first to react and get on the leaderboard!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
