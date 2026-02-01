'use client';

import { Crop, Gauge, RotateCw, Scissors, Volume2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type EditorToolbarProps = {
  duration: number;
  volume: number;
  onTrim: (start: number, end: number) => void;
  onCrop: (aspectRatio: '16:9' | '1:1' | '9:16') => void;
  onRotate: (degrees: 90 | 180 | 270) => void;
  onSpeed: (multiplier: number) => void;
  onVolumeChange: (level: number) => void;
  disabled?: boolean;
};

export function EditorToolbar({
  duration,
  volume,
  onTrim,
  onCrop,
  onRotate,
  onSpeed,
  onVolumeChange,
  disabled = false,
}: EditorToolbarProps) {
  const [trimDialogOpen, setTrimDialogOpen] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [rotateDialogOpen, setRotateDialogOpen] = useState(false);
  const [speedDialogOpen, setSpeedDialogOpen] = useState(false);
  const [volumeDialogOpen, setVolumeDialogOpen] = useState(false);

  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(duration);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'16:9' | '1:1' | '9:16'>('16:9');
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState(volume);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrimApply = () => {
    onTrim(trimStart, trimEnd);
    setTrimDialogOpen(false);
  };

  const handleCropApply = () => {
    onCrop(selectedAspectRatio);
    setCropDialogOpen(false);
  };

  const handleRotateApply = (degrees: 90 | 180 | 270) => {
    onRotate(degrees);
    setRotateDialogOpen(false);
  };

  const handleSpeedApply = () => {
    onSpeed(selectedSpeed);
    setSpeedDialogOpen(false);
  };

  const handleVolumeApply = () => {
    onVolumeChange(selectedVolume);
    setVolumeDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 border-t bg-white p-4">
        <span className="mr-2 text-sm font-medium text-gray-700">Tools:</span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setTrimDialogOpen(true)}
          disabled={disabled}
        >
          <Scissors className="mr-2 size-4" />
          Trim
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCropDialogOpen(true)}
          disabled={disabled}
        >
          <Crop className="mr-2 size-4" />
          Crop
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotateDialogOpen(true)}
          disabled={disabled}
        >
          <RotateCw className="mr-2 size-4" />
          Rotate
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSpeedDialogOpen(true)}
          disabled={disabled}
        >
          <Gauge className="mr-2 size-4" />
          Speed
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setVolumeDialogOpen(true)}
          disabled={disabled}
        >
          <Volume2 className="mr-2 size-4" />
          Volume
        </Button>
      </div>

      {/* Trim Dialog */}
      <Dialog open={trimDialogOpen} onOpenChange={setTrimDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trim Video</DialogTitle>
            <DialogDescription>
              Select the start and end time for your video
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="trim-start">
                Start Time:
                {formatTime(trimStart)}
              </Label>
              <input
                id="trim-start"
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={trimStart}
                onChange={e => setTrimStart(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trim-end">
                End Time:
                {formatTime(trimEnd)}
              </Label>
              <input
                id="trim-end"
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={trimEnd}
                onChange={e => setTrimEnd(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <p className="text-sm text-gray-600">
              New duration:
              {' '}
              {formatTime(trimEnd - trimStart)}
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTrimDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTrimApply}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Crop Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop Video</DialogTitle>
            <DialogDescription>
              Choose an aspect ratio for your video
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setSelectedAspectRatio('16:9')}
                className={`rounded-lg border-2 p-4 transition-all ${
                  selectedAspectRatio === '16:9'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2 aspect-video rounded bg-gray-200" />
                <p className="text-sm font-medium">16:9</p>
                <p className="text-xs text-gray-500">Landscape</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAspectRatio('1:1')}
                className={`rounded-lg border-2 p-4 transition-all ${
                  selectedAspectRatio === '1:1'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2 aspect-square rounded bg-gray-200" />
                <p className="text-sm font-medium">1:1</p>
                <p className="text-xs text-gray-500">Square</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAspectRatio('9:16')}
                className={`rounded-lg border-2 p-4 transition-all ${
                  selectedAspectRatio === '9:16'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mx-auto mb-2 aspect-[9/16] w-1/2 rounded bg-gray-200" />
                <p className="text-sm font-medium">9:16</p>
                <p className="text-xs text-gray-500">Portrait</p>
              </button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCropDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCropApply}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rotate Dialog */}
      <Dialog open={rotateDialogOpen} onOpenChange={setRotateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rotate Video</DialogTitle>
            <DialogDescription>
              Choose rotation angle
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center gap-4 py-4">
            <Button onClick={() => handleRotateApply(90)}>
              <RotateCw className="mr-2 size-4" />
              90° Right
            </Button>
            <Button onClick={() => handleRotateApply(180)}>
              <RotateCw className="mr-2 size-4" />
              180°
            </Button>
            <Button onClick={() => handleRotateApply(270)}>
              <RotateCw className="mr-2 size-4 -scale-x-100" />
              90° Left
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRotateDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Speed Dialog */}
      <Dialog open={speedDialogOpen} onOpenChange={setSpeedDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Speed</DialogTitle>
            <DialogDescription>
              Adjust video playback speed
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Speed:
                {selectedSpeed}
                x
              </Label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={selectedSpeed}
                onChange={e => setSelectedSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedSpeed(0.5)}>
                0.5x
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedSpeed(1)}>
                1x
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedSpeed(1.5)}>
                1.5x
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedSpeed(2)}>
                2x
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSpeedDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSpeedApply}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Volume Dialog */}
      <Dialog open={volumeDialogOpen} onOpenChange={setVolumeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Volume</DialogTitle>
            <DialogDescription>
              Change the audio volume level
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Volume:
                {selectedVolume}
                %
              </Label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={selectedVolume}
                onChange={e => setSelectedVolume(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setVolumeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVolumeApply}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
