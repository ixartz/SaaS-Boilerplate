'use client';

type TimelineRulerProps = {
  totalSecs: number;
  currentTime: number;
  labelWidth: number;
  pxPerSec: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function TimelineRuler({ totalSecs, labelWidth, pxPerSec, onClick }: TimelineRulerProps) {
  // Draw a tick every second; label every 5 seconds
  const ticks: number[] = [];
  for (let s = 0; s <= Math.ceil(totalSecs); s++) {
    ticks.push(s);
  }

  return (
    <div
      className="relative flex h-6 cursor-crosshair select-none border-b border-gray-700 bg-gray-800"
      onClick={onClick}
      style={{ width: labelWidth + totalSecs * pxPerSec }}
    >
      {/* Label spacer */}
      <div className="flex-shrink-0 border-r border-gray-700" style={{ width: labelWidth }} />

      {/* Ticks */}
      <div className="relative flex-1">
        {ticks.map(s => (
          <div
            key={s}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: s * pxPerSec }}
          >
            <div className={`w-px bg-gray-600 ${s % 5 === 0 ? 'h-4' : 'h-2'}`} />
            {s % 5 === 0 && (
              <span className="absolute top-0 left-1 text-[9px] leading-none text-gray-400">
                {formatTime(s)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
