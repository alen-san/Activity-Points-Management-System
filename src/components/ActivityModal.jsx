import React from 'react';
import { X, CheckCircle2, Clock, XCircle, FileText, Calendar, Tag, Award, User } from 'lucide-react';

export default function ActivityModal({ activity, onClose, onStatusChange }) {
  if (!activity) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 size={13} /> Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-500/40">
            <Clock size={13} /> Pending Verification
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-950/80 text-rose-400 border border-rose-500/40">
            <XCircle size={13} /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#141923] border border-[#232d3f] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1f2837] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Activity Details</h3>
              <p className="text-[11px] text-slate-400 font-mono">ID: {activity.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e2736] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <h4 className="text-base font-bold text-white mb-1.5">{activity.activityName}</h4>
            <div className="flex flex-wrap items-center gap-2">
              {getStatusBadge(activity.status)}
              <span className="px-2.5 py-1 rounded-md bg-[#1a2332] text-slate-300 border border-[#263347] flex items-center gap-1.5">
                <Tag size={12} className="text-emerald-400" />
                {activity.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#1a2332] text-slate-300 border border-[#263347] flex items-center gap-1.5">
                <Calendar size={12} className="text-slate-400" />
                {activity.date}
              </span>
            </div>
          </div>

          {/* Points Breakdown Box */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0f141d] border border-[#1d2636]">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">Points Claimed</span>
              <p className="text-xl font-mono font-bold text-slate-200 mt-0.5">
                +{activity.pointsClaimed} PTS
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium">Points Approved</span>
              <p className="text-xl font-mono font-bold text-emerald-400 mt-0.5">
                +{activity.pointsApproved || 0} PTS
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Description & Role
            </label>
            <div className="p-3 rounded-xl bg-[#111722] border border-[#1c2534] text-slate-300 leading-relaxed">
              {activity.description || 'No detailed description provided.'}
            </div>
          </div>

          {/* Attached Document Preview */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Supporting Proof / Certificate
            </label>
            <div className="p-3 rounded-xl bg-[#111722] border border-[#1c2534] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-200">{activity.certificate || 'certificate.pdf'}</p>
                  <p className="text-[10px] text-slate-500">Verified institutional document • 1.4 MB</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                Attached
              </span>
            </div>
          </div>

          {/* Demonstration Quick Actions */}
          <div className="pt-2 border-t border-[#1f2837] flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Demo Faculty Actions:</span>
            <div className="flex space-x-2">
              {activity.status !== 'Approved' && (
                <button
                  onClick={() => {
                    onStatusChange(activity.id, 'Approved', activity.pointsClaimed);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
                >
                  Approve Claim
                </button>
              )}
              {activity.status !== 'Rejected' && (
                <button
                  onClick={() => {
                    onStatusChange(activity.id, 'Rejected', 0);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 font-semibold transition-colors"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
