import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import TempSeeder from './components/TempSeeder';
// 1. IMPORT LOGIC & COMPONENTS
import { useJobs } from './hooks/useJobs';
import { NavBar } from './components/NavBar';
import { JobCard } from './components/JobCard';

// IMPORT YOUR NEW BOARD PAGE
// (Make sure this path matches where you saved it!)
import BoardPage from './views/BoardView';

// 2. IMPORT TYPES
import type { ThemeMode } from './types';

// --- THEME CONFIGURATION ---
const THEME_STYLES = {
  studio: {
    bg: 'bg-[#FDFCF8]',
    text: 'text-stone-900',
    textMuted: 'text-stone-400',
    fontHead: 'font-serif',
    nav: 'bg-white/80 border-stone-200/60 shadow-xl shadow-stone-200/30 text-stone-900',
    navActive: 'bg-stone-900 text-white',
    card: {
       mint: 'bg-[#E3F6F5] border-[#BAE6E3] hover:border-[#2C6E69] text-[#27302E]',
       lavender: 'bg-[#F2E6FF] border-[#E3D0FF] hover:border-[#7F5BB3] text-[#3E2C52]',
       cream: 'bg-[#FFF8E7] border-[#FFE9B5] hover:border-[#D6A645] text-[#4A3B22]',
       sky: 'bg-[#E0F2FE] border-[#BAE6FD] hover:border-[#0284C7] text-[#0C4A6E]',
       rose: 'bg-[#FFE4E6] border-[#FECDD3] hover:border-[#E11D48] text-[#881337]',
       default: 'bg-white border-stone-200 hover:border-stone-400 text-stone-900'
    },
    radius: 'rounded-[2rem]',
    border: 'border'
  },
  midnight: {
    bg: 'bg-[#0f172a]',
    text: 'text-white',
    textMuted: 'text-slate-400',
    fontHead: 'font-sans tracking-tight',
    nav: 'bg-slate-900/80 border-slate-700 shadow-2xl shadow-cyan-900/20 text-slate-200',
    navActive: 'bg-cyan-500 text-black font-bold shadow-cyan-500/50',
    card: {
       mint: 'bg-slate-800 border-slate-700 hover:border-emerald-400 text-emerald-100',
       lavender: 'bg-slate-800 border-slate-700 hover:border-purple-400 text-purple-100',
       cream: 'bg-slate-800 border-slate-700 hover:border-yellow-400 text-yellow-100',
       sky: 'bg-slate-800 border-slate-700 hover:border-cyan-400 text-cyan-100',
       rose: 'bg-slate-800 border-slate-700 hover:border-rose-400 text-rose-100',
       default: 'bg-slate-800 border-slate-700 hover:border-slate-400 text-slate-200'
    },
    radius: 'rounded-2xl',
    border: 'border'
  },
  bold: {
    bg: 'bg-[#FFFCF0]',
    text: 'text-black',
    textMuted: 'text-gray-500',
    fontHead: 'font-sans font-black uppercase italic',
    nav: 'bg-white border-black border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black',
    navActive: 'bg-[#FFD600] text-black border-black',
    card: {
       mint: 'bg-white border-black hover:bg-[#87F5F5] text-black',
       lavender: 'bg-white border-black hover:bg-[#D6BCFA] text-black',
       cream: 'bg-white border-black hover:bg-[#FBD38D] text-black',
       sky: 'bg-white border-black hover:bg-[#90CDF4] text-black',
       rose: 'bg-white border-black hover:bg-[#FEB2B2] text-black',
       default: 'bg-white border-black hover:bg-gray-200 text-black'
    },
    actionCard: 'bg-white border-black hover:bg-[#FFD600] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    radius: 'rounded-none',
    border: 'border-2'
  }
};

export default function JobStudio() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState<ThemeMode>('studio');
  
  // 3. USE CUSTOM HOOK
  const { jobs, loading, user } = useJobs();
  
  const styles = THEME_STYLES[theme] || THEME_STYLES['studio'];

  const toggleTheme = () => {
    setTheme(prev => prev === 'studio' ? 'midnight' : prev === 'midnight' ? 'bold' : 'studio');
  };

  return (
    <div className={`min-h-screen ${styles.bg} ${styles.text} font-sans relative overflow-hidden transition-colors duration-500`}>
      
      {/* Background Decoration */}
      {theme === 'studio' && (
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-rose-100/40 to-orange-100/40 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 animate-pulse pointer-events-none"></div>
      )}
      {theme === 'midnight' && (
        <>
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-900/30 rounded-full filter blur-[100px] animate-pulse pointer-events-none"></div>
        </>
      )}
      {theme === 'bold' && (
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      )}

      {/* 4. RENDER COMPONENTS */}
      <NavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        styles={styles} 
        themeName={theme}
        toggleTheme={toggleTheme}
      />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-20 relative z-10">
        
        {/* === VIEW 1: HOME DASHBOARD === */}
        {activeTab === 'home' && (
          <div className="animate-fade-in-up">
            {/* Header Section */}
            <div className="mb-12">
              <p className={`font-medium mb-2 uppercase tracking-widest text-xs ${styles.textMuted}`}>
                {user ? `User: ${user.uid.slice(0, 5)}...` : 'Connecting...'}
              </p>
              <h2 className={`${styles.fontHead} text-6xl md:text-7xl tracking-tighter leading-[0.9] mb-6`}>
                 Welcome Back, You Have <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                   {jobs.length} New Jobs
                 </span>
              </h2>
            </div>

            {/* Content Section */}
            {loading ? (
               <div className="flex items-center gap-2 opacity-50">
                 <Cpu className="animate-spin" size={20} /> Syncing...
               </div>
            ) : jobs.length === 0 ? (
               <div className={`p-12 border-2 border-dashed ${styles.textMuted} rounded-3xl text-center opacity-50`}>
                 <p>No jobs found. Run your n8n workflow.</p>
                 {user && <p className="text-xs mt-2 font-mono select-all">UID: {user.uid}</p>}
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {jobs.map(job => (
                   <JobCard key={job.id} job={job} styles={styles} />
                 ))}
               </div>
            )}
          </div>
        )}

        {/* === VIEW 2: KANBAN BOARD === */}
        {activeTab === 'board' && (
          <div className="animate-fade-in-up">
            <BoardPage />
          </div>
        )}

        {/* === VIEW 3: SETTINGS (Placeholder) === */}
        {activeTab === 'settings' && (
          <div className="text-center mt-20 opacity-50">
             <h1 className="text-4xl font-bold">Settings</h1>
             <p className="mt-4">API Key configuration coming soon.</p>
          </div>
        )}

         {/* === VIEW 4: JOBS LIST (Placeholder) === */}
         {activeTab === 'collection' && (
          <div className="text-center mt-20 opacity-50">
             <h1 className="text-4xl font-bold">All Jobs</h1>
             <p className="mt-4">Table view coming soon.</p>
          </div>
        )}

      </main>
      
    </div>
  );
}