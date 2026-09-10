import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../context/ActivityContext';
import ActivityModal from '../components/ActivityModal';
import {
  Search,
  Filter,
  PlusCircle,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Trash2,
  Tag,
  Calendar,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';

export default function ActivityList() {
  const { currentStudent } = useAuth();
  const { activities, categories, deleteActivity, updateStatus } = useActivities();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState(null);

  if (!currentStudent) return null;

  // Filter activities for this student
  const studentActivities = activities.filter(
    (act) => act.studentUid === currentStudent.uid
  );

  const filteredActivities = studentActivities.filter((act) => {
    const matchesSearch =
      act.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (act.description && act.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      act.categoryId === selectedCategory ||
      act.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || act.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalClaimed = studentActivities.reduce((acc, a) => acc + (a.pointsClaimed || 0), 0);
  const totalApproved = studentActivities.reduce((acc, a) => acc + (a.pointsApproved || 0), 0);
  const totalPending = studentActivities
    .filter((a) => a.status === 'Pending')
    .reduce((acc, a) => acc + (a.pointsClaimed || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="text-emerald-400" size={24} />
            <span>Activity Points Record</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse, filter, and inspect your co-curricular and extracurricular submissions
          </p>
        </div>

        <Link
          to="/add-activity"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle size={16} />
          <span>Submit New Activity</span>
        </Link>
      </div>

      {/* Mini Summary Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl card-dark border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Approved Points
            </span>
            <p className="text-2xl font-mono font-black text-emerald-400 mt-1">
              +{totalApproved} PTS
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-4 rounded-xl card-dark flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Pending Verification
            </span>
            <p className="text-2xl font-mono font-black text-amber-400 mt-1">
              +{totalPending} PTS
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Clock size={20} />
          </div>
        </div>

        <div className="p-4 rounded-xl card-dark flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Points Claimed
            </span>
            <p className="text-2xl font-mono font-black text-slate-100 mt-1">
              +{totalClaimed} PTS
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#1b2332] flex items-center justify-center text-slate-400">
            <Tag size={20} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-dark p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by activity title or keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0f141e] border border-[#212b3c] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0f141e] border border-[#212b3c] text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase mr-1">
            Filter Status:
          </span>
          {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === status
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-[#151b26] text-slate-400 hover:text-slate-200 border border-[#222d3f]'
              }`}
            >
              {status}
            </button>
          ))}
          <span className="text-[11px] text-slate-500 ml-auto">
            Showing {filteredActivities.length} of {studentActivities.length} records
          </span>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card-dark overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#1b2332] text-slate-500 flex items-center justify-center mx-auto mb-3">
              <FileSpreadsheet size={24} />
            </div>
            <h4 className="text-sm font-semibold text-slate-300">No activities found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No matching activity records found for the selected criteria. Try clearing filters or submit a new activity.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#18212e] text-xs font-semibold text-emerald-400 hover:bg-[#202b3d] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1c2432] bg-[#0f141d]/70 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Activity Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Points Claimed</th>
                  <th className="py-3 px-4 text-center">Points Approved</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17202d]">
                {filteredActivities.map((act) => (
                  <tr
                    key={act.id}
                    className="hover:bg-[#18212e]/60 transition-colors group"
                  >
                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono whitespace-nowrap">
                      {act.date}
                    </td>

                    {/* Name & Description */}
                    <td className="py-3.5 px-4 font-semibold text-slate-100">
                      <div className="max-w-xs sm:max-w-md font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {act.activityName}
                      </div>
                      {act.description && (
                        <div className="text-[11px] text-slate-500 truncate max-w-sm font-normal mt-0.5">
                          {act.description}
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#161d28] border border-[#222c3c] text-[11px]">
                        {act.category}
                      </span>
                    </td>

                    {/* Claimed */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300 whitespace-nowrap">
                      +{act.pointsClaimed}
                    </td>

                    {/* Approved */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400 whitespace-nowrap">
                      +{act.pointsApproved || 0}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {act.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0d281f] text-emerald-400 border border-emerald-500/40">
                          <CheckCircle2 size={11} /> Approved
                        </span>
                      )}
                      {act.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/30">
                          <Clock size={11} /> Pending
                        </span>
                      )}
                      {act.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/60 text-rose-400 border border-rose-500/30">
                          <XCircle size={11} /> Rejected
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          onClick={() => setSelectedActivity(act)}
                          title="View Details & Certificate"
                          className="p-1.5 rounded-lg bg-[#161d29] hover:bg-[#202b3c] text-slate-300 hover:text-emerald-400 border border-[#232d3e] transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete activity "${act.activityName}"?`)) {
                              deleteActivity(act.id);
                            }
                          }}
                          title="Delete Activity"
                          className="p-1.5 rounded-lg bg-[#161d29] hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-[#232d3e] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
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
