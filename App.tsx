
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Scoreboard } from './components/Scoreboard';
import { HockeyRink } from './components/HockeyRink';
import type { Shot, Team } from './types';

export default function App(): React.ReactNode {
  const [period, setPeriod] = useState<number>(1);
  const [shots, setShots] = useState<Shot[]>([]);
  const rinkRef = useRef<HTMLDivElement>(null);

  const handleAddShot = useCallback((x: number, y: number, team: Team) => {
    if (!rinkRef.current) return;

    const rinkRect = rinkRef.current.getBoundingClientRect();
    const rinkWidth = rinkRect.width;

    // In even periods (2, OT, etc.), teams switch sides.
    // The shot map normalizes this by flipping all shots horizontally
    // so that each team consistently attacks the same goal on the map.
    const switchSides = period % 2 === 0;
    const normalizedX = switchSides ? rinkWidth - x : x;

    const newShot: Shot = {
      id: `${Date.now()}-${x}-${y}`,
      x,
      y,
      normalizedX,
      normalizedY: y,
      team,
      period,
    };

    setShots(prevShots => [...prevShots, newShot]);
  }, [period]);

  const handleNextPeriod = useCallback(() => {
    setPeriod(prevPeriod => prevPeriod + 1);
  }, []);
  
  const handleReset = useCallback(() => {
    setPeriod(1);
    setShots([]);
  }, []);

  const memoizedShots = useMemo(() => shots, [shots]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <header className="w-full max-w-6xl text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-300 tracking-tight">Ice Hockey Shot Tracker</h1>
        <p className="text-slate-400 mt-2">Left-click for a Home shot, Right-click for an Away shot.</p>
      </header>
      <main className="w-full max-w-6xl flex flex-col items-center">
        <Scoreboard 
          period={period} 
          shots={memoizedShots} 
          onNextPeriod={handleNextPeriod}
          onReset={handleReset}
        />
        <HockeyRink 
          ref={rinkRef}
          shots={memoizedShots} 
          onAddShot={handleAddShot} 
        />
        <footer className="mt-6 text-center text-slate-500 text-sm">
            <p>Teams switch sides each period. The shot map normalizes all shot positions.</p>
            <p>On this map: Home team is always shown attacking right →, and Away team is always shown attacking left ←.</p>
        </footer>
      </main>
    </div>
  );
}