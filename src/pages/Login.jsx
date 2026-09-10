import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, User, Sparkles, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login, students } = useAuth();
  const navigate = useNavigate();

  const [uid, setUid] = useState('u248010');
  const [password, setPassword] = useState('pass');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(uid, password);
      setLoading(false);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    }, 300);
  };

  const handleQuickLogin = (student) => {
    setUid(student.uid);
    setPassword(student.password);
    const result = login(student.uid, student.password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f15] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-700/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-2xl mb-4 shadow-xl shadow-emerald-500/10">
            AP
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">
            Activity Points Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to track, manage and submit your co-curricular activity points
          </p>
        </div>

        {/* Login Card */}
        <div className="card-dark p-7 shadow-2xl shadow-black/60 border border-[#1f2939]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Student UID / Roll Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="e.g. u248010"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#232d3f] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#232d3f] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-[#232d3f] bg-[#0f141e] text-emerald-500 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>
              <span className="text-emerald-400 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer mt-2"
            >
              <span>{loading ? 'Validating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-5 border-t border-[#1c2432]">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles size={12} className="text-emerald-400" />
              Quick Demo Logins (Click to Sign In):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {students.slice(0, 4).map((s) => (
                <button
                  key={s.uid}
                  type="button"
                  onClick={() => handleQuickLogin(s)}
                  className="p-2 rounded-lg bg-[#0f141e] hover:bg-[#18212e] border border-[#212b3c] hover:border-emerald-500/40 text-left transition-all group"
                >
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 truncate">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mt-0.5">
                    <span>{s.uid}</span>
                    <span className="text-emerald-400 font-sans">{s.badge ? '★' : ''}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3">
              Default password for all demo accounts is <code className="text-emerald-400 font-mono">pass</code>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-slate-400">
          KTU / AICTE Student Co-Curricular & Extracurricular Activity Points
        </div>
      </div>
    </div>
  );
}
