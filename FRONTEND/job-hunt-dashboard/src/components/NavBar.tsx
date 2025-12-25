import React from 'react';
import { Sparkles, Search, LayoutGrid, List, Home, Settings } from 'lucide-react';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  styles: any;
  themeName: string;
  toggleTheme?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab, styles, themeName, toggleTheme }) => {
  
  const NavButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
        ${activeTab === id ? styles.navActive : 'hover:opacity-70 opacity-60 hover:opacity-100'}
      `}
    >
      <Icon size={16} />
      <span className={activeTab === id ? 'block' : 'hidden md:block'}>{label}</span>
    </button>
  );

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <nav className={`pointer-events-auto backdrop-blur-md px-4 py-2 flex items-center gap-2 transition-all duration-300 ${styles.nav} ${styles.radius} ${styles.border}`}>
        
        {/* Brand */}
        <div className="flex items-center gap-2 pr-4 border-r border-current/20 mr-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-current text-white mix-blend-difference">
            <Sparkles size={14} />
          </div>
          <h1 className={`${styles.fontHead} text-lg tracking-tight hidden sm:block`}>
            Job<span className="italic opacity-50">Studio</span>
          </h1>
        </div>

        {/* 1. DASHBOARD: Your morning overview */}
        <NavButton id="home" label="Dashboard" icon={Home} />
        
        {/* 2. JOBS: The n8n feed */}
        <NavButton id="collection" label="Jobs" icon={List} />
        
        {/* 3. BOARD: Your Kanban progress */}
        <NavButton id="board" label="Board" icon={LayoutGrid} />

        {/* 4. SETTINGS: Base Resume & API Keys */}
        <NavButton id="settings" label="Settings" icon={Settings} />

        {/* Search Action */}
        <div className="flex items-center gap-1 pl-4 border-l border-current/20 ml-2">
            <button className={`p-2.5 rounded-full transition-colors hover:bg-black/5`}>
                <Search size={18} />
            </button>
        </div>

      </nav>
    </div>
  );
};