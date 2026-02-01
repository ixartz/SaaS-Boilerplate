// Video editor type definitions

export type VideoProject = {
  id: string;
  userId: string;
  organizationId?: string;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: number; // in seconds
  fileSize?: number; // in bytes
  resolution?: string; // e.g., "1920x1080"
  status: 'draft' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
};

export type VideoEdit = {
  id: string;
  projectId: string;
  editData: EditCommand[];
  version: number;
  createdAt: Date;
};

export type EditCommand =
  | { type: 'trim'; params: TrimParams; timestamp: number }
  | { type: 'crop'; params: CropParams; timestamp: number }
  | { type: 'rotate'; params: RotateParams; timestamp: number }
  | { type: 'speed'; params: SpeedParams; timestamp: number }
  | { type: 'volume'; params: VolumeParams; timestamp: number }
  | { type: 'fadeIn'; params: FadeParams; timestamp: number }
  | { type: 'fadeOut'; params: FadeParams; timestamp: number };

export type TrimParams = {
  start: number; // in seconds
  end: number; // in seconds
};

export type CropParams = {
  aspectRatio: '16:9' | '1:1' | '9:16' | 'custom';
  x: number; // Normalized 0-1
  y: number; // Normalized 0-1
  width: number; // Normalized 0-1
  height: number; // Normalized 0-1
};

export type RotateParams = {
  degrees: 90 | 180 | 270;
};

export type SpeedParams = {
  multiplier: number; // 0.5 to 2.0
};

export type VolumeParams = {
  level: number; // 0 to 100
};

export type FadeParams = {
  duration: number; // in seconds
};

export type EditorState = {
  videoFile: File | null;
  videoUrl: string | null;
  currentTime: number;
  duration: number;
  width: number;
  height: number;
  isPlaying: boolean;
  volume: number;
  playbackSpeed: number;
  rotation: number;
  crop: CropParams | null;
  trim: TrimParams | null;
  editHistory: EditCommand[];
  currentProject: VideoProject | null;
  isProcessing: boolean;
};

export type ExportOptions = {
  quality: '720p' | '1080p' | '4K';
  format: 'mp4' | 'webm';
};

export type UserUsage = {
  id: string;
  userId: string;
  month: string; // "YYYY-MM"
  videosCreated: number;
  storageUsed: number;
  exportCount: number;
};
