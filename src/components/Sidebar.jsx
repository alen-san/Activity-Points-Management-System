import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSpreadsheet,
  PlusCircle,
  FolderTree,
  Award,
  UserCheck,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpenMobile, onCloseMobile }) {
  const { logout, currentStudent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/activities', label: 'Activities', icon: FileSpreadsheet },
    { to: '/add-activity', label: 'Add Activity', icon: PlusCircle },
    { to: '/categories', label: 'Categories', icon: FolderTree },
    { to: '/leaderboard', label: 'Members', icon: Award },
    { to: '/profile', label: 'Profile', icon: UserCheck },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`w-64 bg-[#0d121a] border-r border-[#1a2230] flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)] transition-transform duration-200 z-40 ${
          isOpenMobile
            ? 'fixed inset-y-0 left-0 top-[61px] translate-x-0'
            : 'fixed inset-y-0 left-0 top-[61px] -translate-x-full md:relative md:top-0 md:translate-x-0'
        }`}
      >
        {/* Navigation Links */}
        <div className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Navigation</span>
            {isOpenMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  onClick={onCloseMobile}
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#132d24] text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-950/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#151c27]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      className={isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}
                    />
                    <span>{item.label}</span>
                    {item.to === '/add-activity' && (
                      <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        +Claim
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Student Status Card & Sign Out */}
      <div className="p-4 border-t border-[#1a2230] space-y-3">
        {currentStudent && (
          <div className="p-3 rounded-xl bg-[#131924] border border-[#1e2736]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Points Target</span>
              <span className="font-semibold text-emerald-400">100 PTS</span>
            </div>
            <div className="w-full bg-[#1b2332] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: '85%' }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">
              Pass Criteria: 100 Activity Points
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
    </>
  );
}
