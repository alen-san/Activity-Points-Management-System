import React, { useState } from 'react';
import { Bell, User, LogOut, ChevronDown, CheckCircle2, ShieldCheck, Sparkles, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';

export default function Navbar({ onToggleMobileMenu }) {
  const { currentStudent, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Activity Approved', desc: 'Community Outreach has been verified (+20 pts)', time: '2 hours ago', unread: true },
    { id: 2, title: 'Points Milestone', desc: 'You reached 80% of your graduation target!', time: '1 day ago', unread: true },
    { id: 3, title: 'Review Pending', desc: 'Badminton tournament certificate is in queue', time: '3 days ago', unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f141d]/90 backdrop-blur-md border-b border-[#1c2432] px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left Brand Identity */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg bg-[#161c28] text-slate-400 hover:text-white border border-[#232d3f] transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu size={18} />
        </button>

        {/* AP Icon Badge matching screenshot */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:border-emerald-400 transition-colors">
            <span className="font-extrabold text-emerald-400 text-lg tracking-tighter">AP</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm md:text-base font-bold tracking-wider text-slate-100 uppercase">
              Activity Points Management System
            </h1>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
              KTU / AICTE Student Co-Curricular Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Quick Guide / Info Pill */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#151b26] border border-[#212b3d] text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Semester 6 • B.Tech</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-lg bg-[#161c28] hover:bg-[#1d2535] border border-[#232d3f] text-slate-300 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#0f141d]"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#141923] border border-[#232d3f] shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#212a3b]">
                <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                  <Bell size={15} className="text-emerald-400" /> Notifications
                </h4>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                  2 New
                </span>
              </div>
              <div className="space-y-2 mt-3 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      n.unread
                        ? 'bg-emerald-950/20 border border-emerald-500/20 text-slate-200'
                        : 'bg-[#18202d] text-slate-400'
                    }`}
                  >
                    <div className="font-medium text-slate-100 flex items-center justify-between">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="mt-1 text-slate-300">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill & Dropdown */}
        {currentStudent ? (
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#151c27] hover:bg-[#1a2332] border border-[#232e40] transition-colors"
            >
              <UserAvatar name={currentStudent.name} size="sm" />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-200 leading-tight">
                  {currentStudent.name}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  {currentStudent.uid}
                </div>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#141923] border border-[#232d3f] shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-[#212a3b] mb-2">
                  <p className="text-xs font-semibold text-slate-200">{currentStudent.name}</p>
                  <p className="text-[11px] text-slate-400">{currentStudent.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Sparkles size={11} /> {currentStudent.badge || 'Active Student'}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center space-x-2 p-2 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-[#18202d] transition-colors"
                  >
                    <User size={15} />
                    <span>View Student Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 p-2 rounded-lg text-rose-400 hover:bg-rose-950/30 transition-colors text-left"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Student Login
          </Link>
        )}
      </div>
    </header>
  );
}
