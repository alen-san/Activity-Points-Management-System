import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../context/ActivityContext';
import {
  Cpu,
  Trophy,
  Palette,
  HeartHandshake,
  Rocket,
  Users,
  FolderTree,
  CheckCircle2,
  PlusCircle,
  ShieldAlert,
} from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Trophy: Trophy,
  Palette: Palette,
  HeartHandshake: HeartHandshake,
  Rocket: Rocket,
  Users: Users,
};

export default function Categories() {
  const { currentStudent } = useAuth();
  const { categories, getStudentMetrics } = useActivities();
  const navigate = useNavigate();

  if (!currentStudent) return null;

  const metrics = getStudentMetrics(currentStudent.uid, currentStudent.targetPoints || 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FolderTree className="text-emerald-400" size={24} />
            <span>Activity Categories & Guidelines</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Standard KTU / AICTE institutional point ceilings, approved categories, and your personal progress
          </p>
        </div>

        <button
          onClick={() => navigate('/add-activity')}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle size={16} />
          <span>Claim Points</span>
        </button>
      </div>

      {/* Rules Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#141b25] to-[#12231d] border border-emerald-500/30 flex items-start space-x-3.5">
        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
          <CheckCircle2 size={18} />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-slate-100">Degree Eligibility Criteria: 100 Activity Points</h4>
          <p className="text-slate-400 leading-relaxed">
            Every B.Tech student must earn a minimum of 100 activity points across multiple categories to qualify for the degree.
            Points earned beyond the category maximum cap will not be counted toward the final tally.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.categoryStats.map((cat) => {
          const Icon = iconMap[cat.icon] || FolderTree;
          const isCapped = cat.approvedPoints >= cat.maxPoints;

          return (
            <div
              key={cat.id}
              className="card-dark p-5 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-[#17212e] text-emerald-400 border border-[#212d3f] group-hover:border-emerald-500/40 transition-colors">
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-[#161d28] px-2 py-0.5 rounded border border-[#232d3d]">
                    Cap: {cat.maxPoints} PTS
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-base font-bold text-white mt-3.5 group-hover:text-emerald-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-[#1c2432]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">Earned:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {cat.approvedPoints} / {cat.maxPoints} PTS
                    </span>
                  </div>
                  <div className="w-full bg-[#1b2332] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCapped ? 'bg-emerald-400' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>{cat.percentage}% completed</span>
                    {isCapped && (
                      <span className="text-emerald-400 font-semibold">Category Max Reached!</span>
                    )}
                  </div>
                </div>

                {/* Sample Activities and point limits */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Approved Activities
                  </div>
                  <div className="space-y-1 text-xs">
                    {cat.activities.slice(0, 3).map((act, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1 px-2 rounded bg-[#0f141e] border border-[#1b2332] text-slate-300"
                      >
                        <span className="truncate pr-2">{act.name}</span>
                        <span className="font-mono text-emerald-400 shrink-0 font-semibold">
                          +{act.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-[#1c2432]">
                <button
                  onClick={() => navigate('/add-activity')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18212e] hover:bg-emerald-500/15 hover:text-emerald-400 border border-[#222d3e] hover:border-emerald-500/30 text-xs font-semibold text-slate-300 transition-all flex items-center justify-center space-x-1.5"
                >
                  <PlusCircle size={14} />
                  <span>Claim Under This Category</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
