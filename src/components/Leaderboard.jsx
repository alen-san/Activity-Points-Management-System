import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UserAvatar from './UserAvatar';

export default function Leaderboard() {
  const { students, currentStudent } = useAuth();

  // Top contributors list matching the reference image layout without photos
  const contributors = [
    {
      rank: 1,
      name: 'Sarah Jenkins',
      badge: 'Gold Badge',
      badgeColor: 'text-amber-400',
      badgeBg: 'bg-amber-400/10',
      points: '3,290 PTS',
      hasTrophy: true,
      uid: 'u248010'
    },
    {
      rank: 2,
      name: 'Mark Chen',
      badge: 'Silver',
      badgeColor: 'text-slate-300',
      badgeBg: 'bg-slate-300/10',
      points: '2,810 PTS',
      hasTrophy: false,
      uid: 'u248012'
    },
    {
      rank: 3,
      name: 'Chloe Dubois',
      badge: 'Silver',
      badgeColor: 'text-slate-300',
      badgeBg: 'bg-slate-300/10',
      points: '2,590 PTS',
      hasTrophy: false,
      uid: 'u248018'
    },
  ];

  return (
    <div className="card-dark p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1c2432]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          TOP CONTRIBUTORS
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">Batch 2026</span>
      </div>

      {/* Contributor List */}
      <div className="divide-y divide-[#1b2331] space-y-2.5 my-auto">
        {contributors.map((c) => {
          const isCurrent = currentStudent?.uid === c.uid;
          return (
            <div
              key={c.rank}
              className={`flex items-center justify-between pt-2.5 transition-colors ${
                isCurrent ? 'bg-emerald-950/20 -mx-2 px-2 py-1.5 rounded-lg' : ''
              }`}
            >
              {/* Left Rank & Avatar & Info */}
              <div className="flex items-center space-x-3.5">
                <span className="text-xs font-bold text-slate-400 w-3 text-center">
                  {c.rank}
                </span>
                <div className="relative">
                  <UserAvatar name={c.name} size="md" />
                  {c.rank === 1 && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[9px] text-black font-bold ring-1 ring-[#151a23]">
                      ★
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <span>{c.name}</span>
                    {isCurrent && (
                      <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.2 rounded">
                        You
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] font-medium ${c.badgeColor}`}>
                    {c.badge}
                  </div>
                </div>
              </div>

              {/* Right Points & Trophy */}
              <div className="flex items-center space-x-1.5 text-right">
                <span className="text-xs font-bold text-slate-200 tracking-tight font-mono">
                  {c.points}
                </span>
                {c.hasTrophy && (
                  <span className="text-base" title="Top Performer">
                    🏆
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-[#1c2432] text-center">
        <span className="text-[11px] text-emerald-400 font-medium hover:text-emerald-300 cursor-pointer">
          View Department Standings →
        </span>
      </div>
    </div>
  );
}
