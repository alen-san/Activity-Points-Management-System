import React from 'react';
import { User } from 'lucide-react';

// Generates consistent initials and gradient for a given name without any human photos
export default function UserAvatar({ name = '', size = 'md', className = '' }) {
  const getInitials = (n) => {
    if (!n) return 'AP';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const getGradient = (n) => {
    const gradients = [
      'from-emerald-500/25 to-emerald-700/40 text-emerald-400 border-emerald-500/40',
      'from-cyan-500/25 to-blue-700/40 text-cyan-400 border-cyan-500/40',
      'from-purple-500/25 to-indigo-700/40 text-purple-400 border-purple-500/40',
      'from-amber-500/25 to-orange-700/40 text-amber-400 border-amber-500/40',
      'from-rose-500/25 to-pink-700/40 text-rose-400 border-rose-500/40',
    ];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-13 h-13 sm:w-14 sm:h-14 text-base sm:text-lg',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 text-2xl font-extrabold',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const gradient = getGradient(name);
  const initials = getInitials(name);

  return (
    <div
      className={`relative inline-flex items-center justify-center font-bold tracking-tight select-none rounded-xl bg-gradient-to-br border shadow-sm ${gradient} ${selectedSize} ${className}`}
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
}
