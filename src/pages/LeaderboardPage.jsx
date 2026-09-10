import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../context/ActivityContext';
import { Trophy, Award, Medal, Users, Search, Sparkles, Star } from 'lucide-react';
import UserAvatar from '../components/UserAvatar';

export default function LeaderboardPage() {
  const { students, currentStudent } = useAuth();
  const { getStudentMetrics } = useActivities();
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const fullStudentList = students.map((s, index) => {
    const metrics = getStudentMetrics(s.uid, s.targetPoints || 100);
    return {
      ...s,
      earnedPoints: metrics.totalEarned,
      activitiesCount: metrics.totalActivitiesCount,
    };
  }).sort((a, b) => b.earnedPoints - a.earnedPoints);

  const filteredStudents = departmentFilter === 'All'
    ? fullStudentList
    : fullStudentList.filter(s => s.department.toLowerCase().includes(departmentFilter.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Trophy className="text-amber-400" size={24} />
            <span>Activity Points Leaderboard & Members</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Department standings, highest activity point earners, and honorary student badges
          </p>
        </div>

        {/* Dept Filter */}
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="bg-[#151b26] border border-[#232d3f] text-slate-300 text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer self-start sm:self-auto"
        >
          <option value="All">All Departments</option>
          <option value="Computer">Computer Science</option>
          <option value="Electronics">Electronics & Comm.</option>
          <option value="Mechanical">Mechanical Eng.</option>
          <option value="Information">Information Tech.</option>
        </select>
      </div>

      {/* Podium Cards for Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {fullStudentList.slice(0, 3).map((student, idx) => {
          const medals = ['🥇 1st Place', '🥈 2nd Place', '🥉 3rd Place'];
          const borders = [
            'border-amber-500/50 shadow-amber-500/10',
            'border-slate-400/40 shadow-slate-500/10',
            'border-amber-700/40 shadow-amber-700/10',
          ];

          return (
            <div
              key={student.uid}
              className={`card-dark p-5 text-center flex flex-col items-center justify-between relative border ${borders[idx]} shadow-xl`}
            >
              <div className="absolute top-3 right-3 text-xs font-bold text-slate-400">
                {medals[idx]}
              </div>

              <div className="mt-4 relative">
                <UserAvatar name={student.name} size="lg" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-black font-extrabold">
                  {idx + 1}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="font-bold text-slate-100 text-sm">{student.name}</h3>
                <p className="text-[11px] text-emerald-400 font-mono">{student.uid}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{student.department}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1c2432] w-full">
                <span className="text-xl font-black font-mono text-white">
                  {student.earnedPoints} <span className="text-xs text-emerald-400 font-sans">PTS</span>
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {student.activitiesCount} Verified Activities
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Members Table */}
      <div className="card-dark overflow-hidden">
        <div className="p-4 border-b border-[#1c2432] flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            All Student Standings
          </h3>
          <span className="text-xs text-slate-500">
            Showing {filteredStudents.length} Students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1c2432] bg-[#0f141d]/70 text-slate-400 font-bold uppercase text-[11px]">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department & Semester</th>
                <th className="py-3 px-4 text-center">Activities</th>
                <th className="py-3 px-4 text-center">Badge</th>
                <th className="py-3 px-4 text-right">Points Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17202d]">
              {filteredStudents.map((s, index) => {
                const isCurrent = currentStudent?.uid === s.uid;
                return (
                  <tr
                    key={s.uid}
                    className={`hover:bg-[#18212e]/60 transition-colors ${
                      isCurrent ? 'bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                      #{index + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <UserAvatar name={s.name} size="sm" />
                        <div>
                          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                            <span>{s.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{s.uid}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <div>{s.department}</div>
                      <span className="text-[10px] text-slate-500">{s.semester}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                      {s.activitiesCount}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#172230] text-emerald-300 border border-[#25354a]">
                        {s.badge || 'Active Member'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-400 text-sm">
                      +{s.earnedPoints} PTS
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
