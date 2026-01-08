// Video editor type definitions

export interface VideoProject {
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
}

export interface VideoEdit {
  id: string;
  projectId: string;
  editData: EditCommand[];
  version: number;
  createdAt: Date;
}

export interface EditCommand {
  type: 'trim' | 'crop' | 'rotate' | 'speed' | 'volume' | 'fadeIn' | 'fadeOut';
  params: Record<string, any>;
  timestamp: number;
}

export interface TrimParams {
  start: number; // in seconds
  end: number; // in seconds
}

export interface CropParams {
  aspectRatio: '16:9' | '1:1' | '9:16' | 'custom';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface RotateParams {
  degrees: 90 | 180 | 270;
}

export interface SpeedParams {
  multiplier: number; // 0.5 to 2.0
}

export interface VolumeParams {
  level: number; // 0 to 100
}

export interface FadeParams {
  duration: number; // in seconds
}

export interface EditorState {
  videoFile: File | null;
  videoUrl: string | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  editHistory: EditCommand[];
  currentProject: VideoProject | null;
  isProcessing: boolean;
}

export interface ExportOptions {
  quality: '720p' | '1080p' | '4K';
  format: 'mp4' | 'webm';
}

export interface UserUsage {
  id: string;
  userId: string;
  month: string; // "YYYY-MM"
  videosCreated: number;
  storageUsed: number;
  exportCount: number;
}
