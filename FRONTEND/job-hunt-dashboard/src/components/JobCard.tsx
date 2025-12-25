import React from 'react';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  styles: any; // We pass the current theme styles down
}

export const JobCard: React.FC<JobCardProps> = ({ job, styles }) => {
  // Defensive Programming: Ensure styles.card exists
  const themeClasses = styles.card[job.cardTheme || 'default'] || styles.card.default;

  return (
    <div className={`p-6 transition-all hover:-translate-y-1 cursor-pointer group ${themeClasses} ${styles.radius} ${styles.border} hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-8">
        <span className="px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold uppercase tracking-wide">
          {job.status}
        </span>
        <button className="p-2 rounded-full hover:bg-black/10 transition-colors">
          <Bookmark size={16} />
        </button>
      </div>
      
      
      <div>
        <h4 className={`${styles.fontHead} text-2xl leading-none mb-1 group-hover:underline`}>
          {job.role_title}
        </h4>
        <p className="text-sm opacity-70 font-medium uppercase tracking-wide">
          {job.company}
        </p>
      </div>

      <div className="mt-8 flex justify-between items-end">
        <div className="flex gap-2">
            {/* Show location if tags are empty, purely for aesthetics */}
            <span className="text-xs opacity-50">{job.location}</span>
        </div>
        <ArrowUpRight size={20} />
      </div>
    </div>
    
  );
};