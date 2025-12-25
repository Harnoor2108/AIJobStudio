// Column.tsx
import React from 'react';
import type { ColumnData, Job, JobStatus } from '../../type/type';
import JobCard from './JobCard';
import { MoreHorizontal } from 'lucide-react';

interface ColumnProps {
  column: ColumnData;
  jobs: Job[];
  onDragStart: (e: React.DragEvent, jobId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: JobStatus) => void;
  onSelectJob: (job: Job) => void;
}

const Column: React.FC<ColumnProps> = ({ 
  column, 
  jobs, 
  onDragStart, 
  onDragEnd, 
  onDrop,
  onSelectJob 
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      // Updated: Matches 'Studio' theme (Stone background, large radius)
      className="flex-shrink-0 w-[340px] bg-[#F5F5F0] rounded-[2.5rem] flex flex-col max-h-full border border-stone-200/50"
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="p-6 flex items-center justify-between sticky top-0 bg-transparent z-10">
        <div className="flex items-center gap-3">
          {/* Updated: Serif font for column headers */}
          <h3 className="font-serif font-bold text-stone-800 text-lg">
            {column.title}
          </h3>
          <span className="bg-stone-200 text-stone-600 px-2.5 py-1 rounded-full text-xs font-bold">
            {jobs.length}
          </span>
        </div>
        <button className="text-stone-400 hover:text-stone-900 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4 custom-scrollbar">
        {jobs.length === 0 ? (
          <div className="border-2 border-dashed border-stone-300 rounded-[2rem] p-8 text-center mt-4 opacity-50">
            <p className="text-stone-500 text-sm font-medium">No jobs yet</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onSelect={() => onSelectJob(job)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;