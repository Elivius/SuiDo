import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-11 relative">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Sui! What needs to be done today?"
            className="w-full px-6 py-4 text-lg bg-transparent text-white focus:outline-none transition-all duration-300 placeholder-gray-400 pr-20"
            maxLength={200}
          />
          {text.length > 0 && (
            <div className="absolute left-6 top-full mt-2 flex items-center gap-2 text-xs text-cyan-400">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>AI-powered task optimization available</span>
            </div>
          )}
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white w-12 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!text.trim()}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};