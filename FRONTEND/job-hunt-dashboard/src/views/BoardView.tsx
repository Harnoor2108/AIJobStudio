import React, { useState, useMemo } from 'react';
// 1. IMPORT THE CONTEXT HOOK
import { useJobs } from '../context/JobsContext'; 

// 2. CHECK YOUR PATH: Ensure this points to where your types actually are
import type { BoardData, Job, JobStatus, ColumnData } from '../type/type'; 

import KanbanBoard from '../components/kanban/KanbanBoard'; 
import { Search, TrendingUp, Loader2 } from 'lucide-react';

const BoardPage: React.FC = () => {
  // 3. GET DATA FROM CONTEXT (No more local mock data)
  const { jobsMap, loading, updateJobStatus } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');

 // 4. TRANSFORM DATA: Convert Global Data -> Kanban Structure
 // 4. TRANSFORM DATA: Convert Global Data -> Kanban Structure
  const boardData: BoardData = useMemo(() => {
    // We define ALL columns to satisfy TypeScript, even if we don't show them all.
    const columns: Record<JobStatus, ColumnData> = {
       New: { id: 'New', title: 'New Leads', jobIds: [] }, // Hidden
       Applied: { id: 'Applied', title: 'Applied', jobIds: [] },
       Interview: { id: 'Interview', title: 'Interviewing', jobIds: [] },
       Offer: { id: 'Offer', title: 'Offer', jobIds: [] },
       Rejected: { id: 'Rejected', title: 'Rejected', jobIds: [] },
    };

    Object.values(jobsMap).forEach(job => {
      // 1. FILTER: Skip "New" jobs entirely. They won't appear on this board.
      if (job.status === 'New') return;

      // Search Filter
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      if (matchesSearch) {
        const statusKey = job.status as JobStatus;

        // 2. SORT: Place into columns
        if (columns[statusKey]) {
           columns[statusKey].jobIds.push(job.id);
        } else {
           // Fallback: If status is weird (e.g. typo), put in 'Applied'
           columns['Applied'].jobIds.push(job.id);
        }
      }
    });

    return {
      jobs: jobsMap,
      columns: columns,
      // 3. DISPLAY ORDER: 'New' is removed from here, so it won't render.
      columnOrder: ['Applied', 'Interview', 'Offer', 'Rejected'], 
    };
  }, [jobsMap, searchTerm]);
  // 5. LOADING STATE
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      
      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Application Board</h1>
            <p className="text-gray-500">Track your progress</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
              <TrendingUp className="text-green-500 w-4 h-4" />
              <span className="text-sm font-semibold text-gray-700">
                 Active: {(Object.values(jobsMap) as Job[]).filter(j => j.status !== 'Rejected').length}
              </span>
            </div>
          </div>
        </div>

        {/* 6. FIX: Pass the 'updateJobStatus' function to the new prop */}
        <KanbanBoard 
            data={boardData} 
            onUpdate={() => {}} // We don't need local state update anymore
            onStatusChange={updateJobStatus} // <--- THIS WAS MISSING
        />
      </div>
    </div>
  );
};

export default BoardPage;