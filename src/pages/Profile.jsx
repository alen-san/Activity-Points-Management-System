import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../context/ActivityContext';
import {
  User,
  GraduationCap,
  Mail,
  Building2,
  Calendar,
  Award,
  CheckCircle2,
  Target,
  Clock,
  Printer,
  Sparkles,
  Download,
  ShieldCheck,
} from 'lucide-react';
import UserAvatar from '../components/UserAvatar';

export default function Profile() {
  const { currentStudent } = useAuth();
  const { getStudentMetrics } = useActivities();

  if (!currentStudent) return null;

  const metrics = getStudentMetrics(currentStudent.uid, currentStudent.targetPoints || 100);
  const completionRate = Math.min(100, Math.round((metrics.totalEarned / metrics.targetPoints) * 100));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Print Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <User className="text-emerald-400" size={24} />
            <span>Student Profile & Summary</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Institutional student credentials, verification status, and activity points transcript
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#161d28] hover:bg-[#1d2737] border border-[#232f42] text-slate-200 text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <Printer size={15} className="text-emerald-400" />
          <span>Print / Export Transcript</span>
        </button>
      </div>

      {/* Main Profile Info Card */}
      <div className="card-dark p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-[#1c2432]">
          <div className="relative">
            <UserAvatar name={currentStudent.name} size="xl" />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-black text-[10px] uppercase shadow">
              Verified
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl font-extrabold text-white">{currentStudent.name}</h3>
                <p className="text-xs text-emerald-400 font-mono font-medium">UID: {currentStudent.uid}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs self-center sm:self-auto">
                <Sparkles size={13} />
                <span>{currentStudent.badge || 'Gold Badge'}</span>
              </div>
            </div>

            {/* Metadata Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={15} className="text-slate-500" />
                <span>Department: <strong className="text-slate-100">{currentStudent.department}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-slate-500" />
                <span>Semester: <strong className="text-slate-100">{currentStudent.semester} ({currentStudent.batch})</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-slate-500" />
                <span>Email: <strong className="text-slate-100">{currentStudent.email}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-slate-500" />
                <span>Institution: <strong className="text-slate-100">{currentStudent.institution}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Points Summary Section (PDF Requirement) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
            Activity Points Overall Summary
          </h4>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl card-dark-highlight">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Points Earned
              </span>
              <p className="text-3xl font-mono font-black text-white mt-1">
                {metrics.totalEarned} <span className="text-sm font-sans text-emerald-400">PTS</span>
              </p>
              <p className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1">
                <CheckCircle2 size={12} /> Approved by Mentor
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0f141e] border border-[#1e2736]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Required Target Points
              </span>
              <p className="text-3xl font-mono font-black text-slate-200 mt-1">
                {metrics.targetPoints} <span className="text-sm font-sans text-slate-400">PTS</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                University Graduation Threshold
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0f141e] border border-[#1e2736]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Remaining Points
              </span>
              <p className={`text-3xl font-mono font-black mt-1 ${metrics.remaining === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {metrics.remaining} <span className="text-sm font-sans text-slate-400">PTS</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {metrics.remaining === 0 ? 'Degree Requirement Met!' : 'To be completed before Sem 8'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 p-4 rounded-xl bg-[#0f141e] border border-[#1e2736]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Graduation Readiness Progress</span>
              <span className="font-mono font-bold text-emerald-400">{completionRate}% Complete</span>
            </div>
            <div className="w-full bg-[#1b2332] h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Category-Wise Points Breakdown
          </h4>
          <div className="divide-y divide-[#1c2432] border border-[#1c2432] rounded-xl overflow-hidden text-xs">
            {metrics.categoryStats.map((cat) => (
              <div key={cat.id} className="p-3.5 bg-[#0f141e] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between pr-4">
                    <span className="font-semibold text-slate-200">{cat.name}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {cat.approvedPoints} / {cat.maxPoints} PTS
                    </span>
                  </div>
                  <div className="w-full bg-[#1b2332] h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono sm:text-right sm:w-24">
                  {cat.percentage}% cap
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Note */}
        <div className="p-3.5 rounded-xl bg-[#111824] border border-[#1e2738] flex items-center space-x-3 text-xs text-slate-400">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <span>
            This record is digitally authenticated for academic accreditation and university degree certification.
          </span>
        </div>
      </div>
    </div>
  );
}
