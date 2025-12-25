import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth' ; 
import { auth, db } from '../lib/firebase'; // Adjust path if needed
import type { Job, ColorTheme } from '../types';


export function useJobs() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Handle Auth
  useEffect(() => {
    signInAnonymously(auth).catch((err) => {
      console.error("Auth Failed", err);
      setError("Could not sign in to database.");
    });
    
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // 2. Handle Data Sync
  useEffect(() => {
    if (!user) return;

    // Best Practice: Wrap in try/catch to prevent app crashing
    try {
      // Path: artifacts/job-hunt-agent/users/{UID}/jobs
      const jobsRef = collection(db, 'artifacts', 'job-hunt-agent', 'users', user.uid, 'jobs');
      // Query: Sort by created_at descending (newest first)
      // Note: If this fails initially, remove orderBy until you create an index in Firebase console
      const q = query(jobsRef); // Add orderBy('created_at', 'desc') later

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedJobs = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Logic: Assign a random theme if one is missing
          const themes: ColorTheme[] = ['mint', 'lavender', 'cream', 'sky', 'rose'];
          const randomTheme = themes[Math.floor(Math.random() * themes.length)];

          return {
            id: doc.id,
            ...data,
            cardTheme: data.cardTheme || randomTheme,
          };
        }) as Job[];

        setJobs(fetchedJobs);
        setLoading(false);
      }, (err) => {
        console.error("Firestore Read Error:", err);
        setError(err.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Setup Error", err);
      setLoading(false);
    }
  }, [user]);

  return { jobs, loading, error, user };
}