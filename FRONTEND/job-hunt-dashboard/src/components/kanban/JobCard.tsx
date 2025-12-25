import React from 'react';
// Ensure this path is correct for your project
import type { Job } from '../../type/type'; 
import { Calendar, DollarSign, ExternalLink, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onDragStart: (e: React.DragEvent, jobId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onSelect: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDragStart, onDragEnd, onSelect }) => {
  
  // Helper: Decide which date to show
  // If we applied, show that. If not, show when it was added.
  const displayDate = job.dateApplied 
    ? new Date(job.dateApplied).toLocaleDateString() 
    : new Date(job.dateAdded).toLocaleDateString();

  const isApplied = !!job.dateApplied;

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, job.id)}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      className="bg-white p-4 rounded-[1.25rem] shadow-sm border border-stone-100 hover:border-stone-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group w-full"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-serif font-medium group-hover:font-bold text-stone-900 text-base leading-tight transition-all duration-200 truncate pr-2">
          {job.title}
        </h4>
        
        <button className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-stone-900 transition-all flex-shrink-0">
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <p className="text-xs text-stone-500 mb-3 font-medium tracking-wide uppercase">
        {job.company}
      </p>

      <div className="flex items-center justify-between">
        {job.salary ? (
          <div className="flex items-center gap-1 text-[10px] font-bold text-orange-800 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
            <DollarSign className="w-2.5 h-2.5 text-orange-600" />
            {job.salary}
          </div>
        ) : <div />}
        
        {/* FIXED DATE LOGIC */}
        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-medium">
          {isApplied ? <Calendar className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          <span>
            {isApplied ? 'Applied ' : 'Added '} 
            {displayDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;