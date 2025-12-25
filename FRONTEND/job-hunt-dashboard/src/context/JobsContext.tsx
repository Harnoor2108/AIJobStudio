import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { db } from '../lib/firebase'; // Ensure this matches your file path
import { collection, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import type { Job, JobStatus } from '../type/type'; // Ensure this matches your types path

// 1. Define the Shape of our Global Store
interface JobsContextType {
  jobs: Job[];                  // Array for Lists/Tables
  jobsMap: Record<string, Job>; // Object for fast Kanban lookups
  loading: boolean;
  updateJobStatus: (jobId: string, newStatus: JobStatus) => Promise<void>;
}

// 2. Create the Context
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// 3. The Provider Component
export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsMap, setJobsMap] = useState<Record<string, Job>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SINGLE DB CONNECTION
    const q = query(collection(db, "jobs"));
    
    console.log(" Connecting to Firebase Jobs...");
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newJobs: Job[] = [];
      const newMap: Record<string, Job> = {};

      snapshot.forEach((doc) => {
        const job = doc.data() as Job;
        job.id = doc.id; // Ensure ID matches Doc ID
        newJobs.push(job);
        newMap[job.id] = job;
      });

      console.log(`Loaded ${newJobs.length} jobs from Firebase.`);
      setJobs(newJobs);
      setJobsMap(newMap);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Global Update Function
  const updateJobStatus = async (jobId: string, newStatus: JobStatus) => {
    try {
      // Optimistic update could go here, but Firebase is fast enough for now
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, { status: newStatus });
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  return (
    <JobsContext.Provider value={{ jobs, jobsMap, loading, updateJobStatus }}>
      {children}
    </JobsContext.Provider>
  );
};

// 4. Custom Hook for Components to use
export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};