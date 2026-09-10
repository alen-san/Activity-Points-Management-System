import React from 'react';
import { ArrowUpRight, CheckCircle, Clock, Target, Sparkles } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtext,
  badgeText,
  isHighlight = false,
  icon: Icon,
  accentColor = 'text-emerald-400',
}) {
  return (
    <div
      className={`p-5 rounded-xl transition-all duration-200 flex flex-col justify-between ${
        isHighlight
          ? 'card-dark-highlight'
          : 'card-dark hover:border-[#2a3547]'
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
            {title}
          </span>
          {Icon && (
            <div className={`p-1.5 rounded-lg ${isHighlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#1b2230] text-slate-400'}`}>
              <Icon size={16} />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline space-x-2.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {value}
          </span>
          {badgeText && (
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              {badgeText}
            </span>
          )}
        </div>
      </div>

      {subtext && (
        <div className="mt-3 pt-2.5 border-t border-[#1c2432]/60 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{subtext}</span>
          {isHighlight && (
            <span className="text-emerald-400 font-medium">85% Complete</span>
          )}
        </div>
      )}
    </div>
  );
}
