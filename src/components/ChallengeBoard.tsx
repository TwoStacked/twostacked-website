import React, { useState } from 'react';
import { Swords, ShieldAlert, Sparkles, CheckCircle2, Clock, Hourglass } from 'lucide-react';
import { ChallengeItem } from '../types';

export const ChallengeBoard: React.FC = () => {
  const [challenges] = useState<ChallengeItem[]>([
    {
      id: 'challenge-1',
      title: 'No Armor Challenge',
      description: 'Winning matches without equipping any armor tier.',
      status: 'IN PROGRESS',
      badgeColor: 'text-rose-400 border-rose-800/40 bg-rose-950/40',
    },
    {
      id: 'challenge-2',
      title: 'Bow Only Challenge',
      description: 'Eliminating opponents and destroying beds using only ranged bows.',
      status: 'COMING SOON',
      badgeColor: 'text-neutral-400 border-neutral-700/40 bg-neutral-900/40',
    },
    {
      id: 'challenge-3',
      title: 'No Death Challenge',
      description: 'Securing a win with zero deaths throughout the match.',
      status: 'COMING SOON',
      badgeColor: 'text-neutral-400 border-neutral-700/40 bg-neutral-900/40',
    },
    {
      id: 'challenge-4',
      title: 'No Damage Challenge',
      description: 'Completing the entire game without taking a single hit of damage.',
      status: 'COMING SOON',
      badgeColor: 'text-neutral-400 border-neutral-700/40 bg-neutral-900/40',
    },
  ]);

  return (
    <section id="challenges" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
          THE CHALLENGE BOARD
        </h2>
      </div>

      {/* 2x2 Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            id={`card-${challenge.id}`}
            className="group relative bg-[#0e0e13] hover:bg-[#14141c] border border-white/5 hover:border-white/15 rounded-xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
                {challenge.title}
              </h3>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase shrink-0 border ${challenge.badgeColor}`}
              >
                {challenge.status === 'IN PROGRESS' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                )}
                {challenge.status === 'COMPLETED' && (
                  <CheckCircle2 size={12} className="text-emerald-400" />
                )}
                {challenge.status === 'COMING SOON' && (
                  <Hourglass size={12} className="text-neutral-400" />
                )}
                <span>{challenge.status}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 font-normal leading-relaxed">
              {challenge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
