import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="h-40 bg-slate-200 dark:bg-slate-700/50"></div>
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded w-1/2"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-3/4"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700/50 rounded w-1/3 mt-4"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700/50 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};
