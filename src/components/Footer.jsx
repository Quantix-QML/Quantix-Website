import React from 'react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function Footer({ onOpenJoinModal }) {
  return (
    <footer className="bg-[#031d5b] text-white py-16 px-6 sm:px-10 font-mono text-xs relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="px-3 py-1 rounded-full bg-white text-electric-600 font-display font-black text-sm tracking-tight flex items-center gap-2 shadow-sm">
              <img
                src="/QUANTIX-emblem.png"
                alt="Quantix Logo"
                className="w-4 h-4 object-contain"
              />
              <span>QUANTIX</span>
            </div>
          </div>
          <div className="text-white/70 text-micro mt-2">
            Quantum Computing Club &bull; Shridevi Institute of Engineering &amp; Technology, Tumakuru
          </div>
          <div className="text-white/50 text-nano mt-0.5">
            Dept. of Artificial Intelligence &amp; Data Science &bull; Dept. of AI &amp; ML &bull; In collab with AI Syntax Surge
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-micro">
          <a href="#/about" className="text-white/80 hover:text-lime-400 transition-colors">
            About Club
          </a>
          <a href="#/research" className="text-white/80 hover:text-lime-400 transition-colors">
            Research
          </a>
          <a href="#/tracks" className="text-white/80 hover:text-lime-400 transition-colors">
            Tracks
          </a>
          <a href="#/team" className="text-white/80 hover:text-lime-400 transition-colors">
            Team
          </a>
          <a
            href="https://github.com/Quantix-QML/Quantix-Website"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-lime-400 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
