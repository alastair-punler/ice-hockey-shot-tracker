
import React, { useMemo } from 'react';
import type { Shot } from '../types';

interface ScoreboardProps {
  period: number;
  shots: Shot[];
  onNextPeriod: () => void;
  onReset: () => void;
}

export function Scoreboard({ period, shots, onNextPeriod, onReset }: ScoreboardProps): React.ReactNode {
  const { homeTotal, awayTotal, homePeriod, awayPeriod } = useMemo(() => {
    return {
      homeTotal: shots.filter(s => s.team === 'home').length,
      awayTotal: shots.filter(s => s.team === 'away').length,
      homePeriod: shots.filter(s => s.team === 'home' && s.period === period).length,
      awayPeriod: shots.filter(s => s.team === 'away' && s.period === period).length,
    };
  }, [shots, period]);
  
  const periodDisplay = useMemo(() => {
    if (period > 3) return `OT${period > 4 ? period - 3 : ''}`;
    return `P${period}`;
  }, [period]);

  return (
    <div className="w-full bg-slate-800 rounded-lg shadow-lg p-4 mb-4 border border-slate-700">
      <div className="flex justify-between items-center">
        {/* Away Team */}
        <div className="flex-1 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-400">AWAY</h2>
          <p className="text-4xl sm:text-6xl font-black tracking-tighter">{awayTotal}</p>
          <p className="text-sm text-slate-400">Period: {awayPeriod}</p>
        </div>

        {/* Period and Controls */}
        <div className="flex-1 text-center px-2">
          <div className="text-3xl sm:text-4xl font-extrabold text-yellow-300">{periodDisplay}</div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-2">
            <button
              onClick={onNextPeriod}
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
            >
              Next Period
            </button>
            <button
              onClick={onReset}
              className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Home Team */}
        <div className="flex-1 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-400">HOME</h2>
          <p className="text-4xl sm:text-6xl font-black tracking-tighter">{homeTotal}</p>
          <p className="text-sm text-slate-400">Period: {homePeriod}</p>
        </div>
      </div>
    </div>
  );
}
