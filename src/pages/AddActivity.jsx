import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../context/ActivityContext';
import confetti from 'canvas-confetti';
import {
  PlusCircle,
  Upload,
  Calendar,
  Tag,
  Award,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export default function AddActivity() {
  const { currentStudent } = useAuth();
  const { categories, addActivity } = useActivities();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    activityName: '',
    categoryId: 'technical',
    date: new Date().toISOString().split('T')[0],
    pointsClaimed: 20,
    description: '',
    certificateName: 'certificate_document.pdf',
    autoApprove: false,
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!currentStudent) return null;

  const currentCategory = categories.find((c) => c.id === formData.categoryId) || categories[0];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setFormData((prev) => ({ ...prev, certificateName: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.activityName.trim()) {
      setError('Please provide an activity title.');
      return;
    }

    if (formData.pointsClaimed <= 0) {
      setError('Points claimed must be greater than 0.');
      return;
    }

    // Add activity
    addActivity({
      studentUid: currentStudent.uid,
      activityName: formData.activityName.trim(),
      category: currentCategory.name,
      categoryId: formData.categoryId,
      date: formData.date,
      pointsClaimed: Number(formData.pointsClaimed),
      description: formData.description.trim(),
      certificate: formData.certificateName,
      autoApprove: formData.autoApprove,
    });

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#10b981', '#f59e0b'],
      });
    } catch (err) {
      console.log('Confetti not available', err);
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto my-8 card-dark-highlight p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-black text-white">
          Activity Claim Submitted!
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          Your submission for <span className="text-emerald-400 font-semibold">{formData.activityName}</span> has been logged.
          {formData.autoApprove
            ? ' It has been automatically verified and added to your points balance!'
            : ' It has been queued for faculty mentor verification.'}
        </p>

        <div className="p-4 rounded-xl bg-[#0e141e] border border-[#1f2837] text-xs font-mono text-left space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Points Claimed:</span>
            <span className="text-emerald-400 font-bold">+{formData.pointsClaimed} PTS</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Category:</span>
            <span className="text-slate-200">{currentCategory.name}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Date:</span>
            <span className="text-slate-200">{formData.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 pt-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                activityName: '',
                categoryId: 'technical',
                date: new Date().toISOString().split('T')[0],
                pointsClaimed: 20,
                description: '',
                certificateName: 'certificate_document.pdf',
                autoApprove: false,
              });
              setUploadedFile(null);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#17212f] hover:bg-[#1f2c3e] text-xs font-semibold text-slate-300 transition-colors"
          >
            Submit Another Activity
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-[#141923] hover:bg-[#1b2332] border border-[#212b3c] text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <PlusCircle className="text-emerald-400" size={24} />
            <span>Submit Activity Points Claim</span>
          </h2>
          <p className="text-xs text-slate-400">
            Log your approved participation in technical, sports, cultural, or social initiatives
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card-dark p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Activity Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Activity Title <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. National Smart India Hackathon Winner / NSS Camp Coordinator"
              value={formData.activityName}
              onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#212b3c] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Category & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Activity Category <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#212b3c] text-xs text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} (Max {cat.maxPoints} pts)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Date of Activity / Completion <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#212b3c] text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Category Helper Info Pill */}
          <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#1f2837] text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Tag size={13} /> {currentCategory.name}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Maximum Allowed: {currentCategory.maxPoints} PTS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          {/* Points Claimed */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Points Claimed <span className="text-emerald-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                Standard guidelines: 10 to 35 PTS per activity
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="1"
                max={currentCategory.maxPoints}
                required
                value={formData.pointsClaimed}
                onChange={(e) => setFormData({ ...formData, pointsClaimed: e.target.value })}
                className="w-36 px-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#212b3c] text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
              <div className="flex flex-wrap gap-1.5">
                {[10, 15, 20, 25, 30].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setFormData({ ...formData, pointsClaimed: preset })}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      Number(formData.pointsClaimed) === preset
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-[#151c27] text-slate-400 hover:text-slate-200 border border-[#222c3c]'
                    }`}
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Activity Description & Role
            </label>
            <textarea
              rows="3"
              placeholder="Describe your role, organizers, prize/level, and achievements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f141e] border border-[#212b3c] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
            ></textarea>
          </div>

          {/* Supporting Document / Certificate Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Upload Certificate / Proof of Participation
            </label>
            <div className="border-2 border-dashed border-[#232d3f] hover:border-emerald-500/50 rounded-2xl p-5 text-center transition-colors bg-[#0f141e]/50">
              <input
                type="file"
                id="cert-upload"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
              />
              <label
                htmlFor="cert-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Upload size={20} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-400 hover:underline">
                    Click to browse
                  </span>
                  <span className="text-xs text-slate-400"> or drag and drop certificate</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  PDF, PNG, JPG up to 5MB (Institutional certificates, winner credentials)
                </p>
              </label>

              {/* Uploaded indicator */}
              {(uploadedFile || formData.certificateName) && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span className="font-mono">
                    {uploadedFile ? uploadedFile.name : formData.certificateName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Demo Option: Auto-Approve */}
          <div className="p-3.5 rounded-xl bg-[#141c28] border border-[#232e40] flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-400" />
                <span>Simulate Instant Faculty Mentor Approval</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Toggle to instantly approve points instead of keeping it in pending queue.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoApprove}
                onChange={(e) => setFormData({ ...formData, autoApprove: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#253042] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PlusCircle size={18} />
              <span>Submit Activity for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
