
export type ThemeMode = 'studio' | 'midnight' | 'bold';
export type ColorTheme = 'mint' | 'lavender' | 'cream' | 'sky' | 'rose' | 'default';

export interface Job {
  id: string;
  role_title: string;      // This must match your n8n output column
  company: string;
  location: string;
  tags?: string[];
  status: 'identified' | 'tailoring' | 'applied' | 'interview' | 'rejected';
  created_at: any;         // Firestore Timestamp
  cardTheme?: ColorTheme;  // We add this on the frontend for style
}