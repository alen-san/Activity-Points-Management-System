import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../context/ActivityContext';
import StatCard from '../components/StatCard';
import TrendChart from '../components/TrendChart';
import Leaderboard from '../components/Leaderboard';
import ActivityModal from '../components/ActivityModal';
import UserAvatar from '../components/UserAvatar';
import {
  Sparkles,
  Award,
  Clock,
  Target,
  PlusCircle,
  Filter,
  CheckCircle2,
  ChevronRight,
  User,
  GraduationCap,
  Building2,
  Calendar,
} from 'lucide-react';

export default function Dashboard() {
  const { currentStudent } = useAuth();
  const { activities, getStudentMetrics, updateStatus } = useActivities();

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState('Overview');

  if (!currentStudent) {
    return null;
  }

  const metrics = getStudentMetrics(currentStudent.uid, currentStudent.targetPoints || 100);

  // Recent activities list for current student or global feed
  const recentActivities = activities.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Student Academic Info Banner (PDF Requirement: Student Name, UID, Dept, Semester) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#141d2b] via-[#121924] to-[#142322] border border-[#1f2b3e] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-black/40">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <UserAvatar name={currentStudent.name} size="lg" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-[#0b0f15] flex items-center justify-center text-[10px] text-black font-bold">
              ✓
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {currentStudent.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {currentStudent.badge || 'Honor Student'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                UID: {currentStudent.uid}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap size={14} className="text-slate-400" />
                {currentStudent.department}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-slate-400" />
                {currentStudent.semester}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 self-end md:self-center">
          <Link
            to="/add-activity"
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Submit Activity</span>
          </Link>
          <Link
            to="/profile"
            className="px-3.5 py-2 rounded-xl bg-[#192231] hover:bg-[#202b3e] border border-[#27354c] text-xs font-semibold text-slate-200 transition-colors"
          >
            Full Profile
          </Link>
        </div>
      </div>

      {/* Dashboard Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Real-time activity points accumulation and verification feed
          </p>
        </div>

        {/* Filter Dropdown matching screenshot ("Overview") */}
        <div className="relative">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="bg-[#151b26] border border-[#232d3f] text-slate-300 text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
          >
            <option value="Overview">Overview</option>
            <option value="Semester 6">Semester 6</option>
            <option value="Academic Year 2023-24">Academic Year 2023-24</option>
          </select>
        </div>
      </div>

      {/* Top Stat Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Points Balance (Highlighted card matching screenshot with green border and +12% badge) */}
        <StatCard
          title="TOTAL POINTS BALANCE"
          value={metrics.totalEarned.toLocaleString()}
          badgeText="+12% ↑"
          isHighlight={true}
          icon={Award}
          subtext={`Target: ${metrics.targetPoints} PTS | Remaining: ${metrics.remaining} PTS`}
        />

        {/* Points Earned (This Month / Semester) */}
        <StatCard
          title="POINTS EARNED (THIS MONTH)"
          value={metrics.thisMonthEarned.toLocaleString()}
          isHighlight={false}
          icon={Sparkles}
          subtext="Co-curricular & outreach verified"
        />

        {/* Pending Approvals */}
        <StatCard
          title="PENDING APPROVALS"
          value={metrics.pendingCount.toString()}
          isHighlight={false}
          icon={Clock}
          subtext={`${metrics.pendingPoints} PTS waiting verification`}
        />

        {/* Remaining Points to Target (Explicit PDF Requirement) */}
        <StatCard
          title="REMAINING TO GRADUATE"
          value={metrics.remaining.toString()}
          isHighlight={false}
          icon={Target}
          subtext={`Passing requirement: ${metrics.targetPoints} PTS`}
        />
      </div>

      {/* Middle Row: Trend Chart (2 cols) & Top Contributors (1 col) matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart studentPoints={metrics.totalEarned} />
        </div>
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      {/* Bottom Section: RECENT ACTIVITIES FEED Table matching screenshot */}
      <div className="card-dark p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1c2432] gap-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              RECENT ACTIVITIES FEED
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Click any activity to view proof details and faculty remarks
            </p>
          </div>
          <Link
            to="/activities"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View All Student Activities</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1a2330] text-slate-400 font-bold uppercase text-[11px]">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Activity</th>
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Points</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17202d]">
              {recentActivities.map((act) => {
                return (
                  <tr
                    key={act.id}
                    onClick={() => setSelectedActivity(act)}
                    className="hover:bg-[#18212e]/70 cursor-pointer transition-colors group"
                  >
                    {/* Date */}
                    <td className="py-3.5 px-3 text-slate-400 font-mono whitespace-nowrap">
                      {act.date}
                    </td>

                    {/* Activity Title */}
                    <td className="py-3.5 px-3 font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      <div className="max-w-xs truncate">{act.activityName}</div>
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2">
                        <UserAvatar name={currentStudent.name} size="xs" />
                        <span className="text-slate-300 whitespace-nowrap">
                          {currentStudent.name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                      {act.category.split('&')[0]}
                    </td>

                    {/* Points (+500 green style matching screenshot) */}
                    <td className="py-3.5 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                      +{act.pointsApproved || act.pointsClaimed}
                    </td>

                    {/* Status Pill matching screenshot */}
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      {act.status === 'Approved' && (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0d281f] text-emerald-400 border border-emerald-500/40">
                          Approved
                        </span>
                      )}
                      {act.status === 'Pending' && (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/30">
                          Pending
                        </span>
                      )}
                      {act.status === 'Rejected' && (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-950/60 text-rose-400 border border-rose-500/30">
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onStatusChange={(id, newStatus, pts) => {
            updateStatus(id, newStatus, pts);
            setSelectedActivity((prev) => (prev ? { ...prev, status: newStatus, pointsApproved: pts } : null));
          }}
        />
      )}
    </div>
  );
}
