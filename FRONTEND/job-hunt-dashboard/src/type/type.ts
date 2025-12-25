// 1. Updated Statuses to include 'New' (The Inbox)
export type JobStatus = 'New' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
  id: string;              // Unique Primary Key (e.g., from Firebase or n8n)
  
  // Core Info
  title: string;
  company: string;
  location?: string;       // Good to have (Remote vs On-site)
  salary?: string;         // Optional (n8n might not find it)
  
  // The "Meat" for AI
  description: string;     // The full HTML or Text description
  skills: string[];        // AI extracted keywords ['React', 'TypeScript']
  
  // Dates
  dateAdded: string;       // When n8n found it (ISO String)
  dateApplied?: string;    // When you moved it to 'Applied' column
  deadline?: string;       // Urgent priority flag
  
  // Actionable Info
  contactEmail?: string;   // For the AI Email Agent feature
  link?: string;           // URL to the actual job post
  
  // Status
  status: JobStatus;

  // Documents (The Text Content)
  // We store the text here so you can edit it in the app before exporting
  generatedCoverLetter?: string; 
  generatedResumeJSON?: string; // Or a specific structure for resume tailoring
}

// 2. Column Data matches the new Status type
export interface ColumnData {
  id: JobStatus;
  title: string;
  jobIds: string[];
}

export interface BoardData {
  jobs: Record<string, Job>;
  columns: Record<JobStatus, ColumnData>;
  columnOrder: JobStatus[];
}