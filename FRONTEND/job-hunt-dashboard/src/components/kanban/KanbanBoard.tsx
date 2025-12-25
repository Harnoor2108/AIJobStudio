// src/components/kanban/KanbanBoard.tsx
import React, { useState } from 'react';
// Make sure this path points to your types file
import type { BoardData, Job, JobStatus } from '../../type/type'; 
import Column from './Column';
import JobDetailModal from './JobDetailModal';

interface KanbanBoardProps {
  data: BoardData;
  onUpdate: (newData: BoardData) => void;
  // NEW: Function to trigger the Firebase update
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ data, onUpdate, onStatusChange }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [draggedJobId, setDraggedJobId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, jobId: string) => {
    setDraggedJobId(jobId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      (e.target as HTMLElement).style.opacity = '0.5';
    }, 0);
  };

  const onDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = '1';
    setDraggedJobId(null);
  };

  const onDrop = (e: React.DragEvent, targetStatus: JobStatus) => {
    e.preventDefault();
    if (!draggedJobId) return;

    const sourceStatus = data.jobs[draggedJobId].status;
    if (sourceStatus === targetStatus) return;

    // 1. Calculate the new state (Optimistic UI)
    // We keep this so the card moves INSTANTLY while Firebase processes in background
    const updatedJob = { ...data.jobs[draggedJobId], status: targetStatus };
    const updatedJobs = { ...data.jobs, [draggedJobId]: updatedJob };

    const sourceCol = data.columns[sourceStatus];
    const sourceJobIds = sourceCol.jobIds.filter(id => id !== draggedJobId);
    const updatedSourceCol = { ...sourceCol, jobIds: sourceJobIds };

    const targetCol = data.columns[targetStatus];
    const targetJobIds = [draggedJobId, ...targetCol.jobIds];
    const updatedTargetCol = { ...targetCol, jobIds: targetJobIds };

    // 2. Update Local View
    onUpdate({
      ...data,
      jobs: updatedJobs,
      columns: {
        ...data.columns,
        [sourceStatus]: updatedSourceCol,
        [targetStatus]: updatedTargetCol
      }
    });

    // 3. NEW: Update Firebase (The Real Save)
    onStatusChange(draggedJobId, targetStatus);
  };

  return (
    <div className="flex gap-8 h-[calc(100vh-250px)] overflow-x-auto pb-4 px-2">
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        // Safety check: ensure we handle jobs that might be loading/undefined
        const jobs = column.jobIds
          .map(jobId => data.jobs[jobId])
          .filter(Boolean);

        return (
          <Column
            key={columnId}
            column={column}
            jobs={jobs}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            onSelectJob={setSelectedJob}
          />
        );
      })}

      {selectedJob && (
        <JobDetailModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
};

export default KanbanBoard;