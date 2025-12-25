import React from 'react';
import type { Job } from '../../type/type';
import { X, Sparkles, Calendar, MapPin, Building2, Briefcase } from 'lucide-react';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
      <div 
        // Updated: 'Studio' background color and large radius
        className="bg-[#FDFCF8] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Minimalist Studio Style */}
        <div className="p-8 pb-0 relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-stone-100 text-stone-900">
              <Building2 className="w-10 h-10 opacity-80" />
            </div>
            <div className="pt-1">
              {/* Updated: Serif Title */}
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-1">{job.title}</h2>
              <p className="text-stone-500 font-medium text-lg">{job.company}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pb-8 border-b border-stone-200/60">
            <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full text-sm font-medium text-stone-600">
              <Calendar className="w-4 h-4" />
              <span>{job.dateApplied}</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full text-sm font-medium text-stone-600">
              <Briefcase className="w-4 h-4" />
              <span>{job.status}</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full text-sm font-medium text-stone-600">
              <MapPin className="w-4 h-4" />
              <span>Remote</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Col */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Description</h3>
              <p className="text-stone-700 leading-relaxed font-sans text-base">
                {job.description || "No description provided. Add details about this role to track the specific requirements and skills needed for this position."}
              </p>
            </div>

            {/* Right Col: AI Integration */}
            <div className="space-y-6">
              {/* Updated: Using Rose/Orange gradient for the AI touch */}
              <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-orange-100 rounded-[2rem] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="text-orange-500 w-5 h-5" />
                  <h3 className="text-lg font-bold text-stone-900 font-serif">AI Prep</h3>
                </div>
                <p className="text-stone-600 text-sm mb-4">
                  Get tailored interview questions based on this specific job description.
                </p>
                <button className="w-full py-2.5 bg-white border border-orange-200 text-orange-700 font-bold rounded-xl text-sm hover:bg-orange-50 transition-colors shadow-sm">
                  Generate Tips
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-white border border-stone-200 rounded-2xl text-stone-600 font-bold hover:bg-stone-100 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-3 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-colors shadow-lg shadow-stone-900/20">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;