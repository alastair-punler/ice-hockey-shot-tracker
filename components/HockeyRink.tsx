import React, { forwardRef } from 'react';
import rinkImage from '../assets/Sport-Hockey-Simple-hockey-field-Template.png';
import type { Shot, Team } from '../types';

interface HockeyRinkProps {
  shots: Shot[];
  onAddShot: (x: number, y: number, team: Team) => void;
}

const ShotMarker = ({ team }: { team: Team }) => {
  const colorClasses = team === 'home' ? 'bg-blue-500/70 border-blue-300' : 'bg-red-500/70 border-red-300';
  return (
    <div className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 ${colorClasses} shadow-md`}></div>
  );
};

export const HockeyRink = forwardRef<HTMLDivElement, HockeyRinkProps>(({ shots, onAddShot }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onAddShot(x, y, 'home');
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onAddShot(x, y, 'away');
  };

  return (
    <div
      ref={ref}
      className="relative w-full max-w-6xl aspect-[2/0.85] cursor-crosshair rounded-lg overflow-hidden border-2 border-slate-600 shadow-2xl bg-slate-100"
      style={{
        backgroundImage: `url('${rinkImage}')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {shots.map(shot => (
        <div
          key={shot.id}
          className="absolute pointer-events-none"
          style={{
            left: `${shot.normalizedX}px`,
            top: `${shot.normalizedY}px`,
          }}
        >
          <ShotMarker team={shot.team} />
        </div>
      ))}
    </div>
  );
});