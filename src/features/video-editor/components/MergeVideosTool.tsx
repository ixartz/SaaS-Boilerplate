'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useMediabunny } from '@/hooks/use-mediabunny'
import { createBlobInput, createMp4Output } from '@/lib/mediabunny-loader'
import { cn } from '@/utils/Helpers'
import { GripVertical, X, Download, RefreshCw, Plus } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Mediabunny = typeof import('mediabunny')

type Status = 'idle' | 'ready' | 'converting' | 'success' | 'error'

type VideoFile = {
  id: string
  file: File
}

export function MergeVideosTool() {
  const [videoFiles, setVideoFiles] = React.useState<VideoFile[]>([])
  const [status, setStatus] = React.useState<Status>('idle')
  const [progress, setProgress] = React.useState<number>(0)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  
  // New state for preview
  const [mergedVideoUrl, setMergedVideoUrl] = React.useState<string | null>(null)
  const [mergedVideoName, setMergedVideoName] = React.useState<string | null>(null)
  


  const { mediabunny, loading, reload } = useMediabunny()

  const handleFilesSelected = React.useCallback((files: File[]) => {
    if (files.length === 0) return

    const newVideoFiles: VideoFile[] = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
    }))

    setVideoFiles((prev) => [...prev, ...newVideoFiles])
    setStatus('ready')
    setProgress(0)
    setErrorMessage(null)
    setMergedVideoUrl(null)
  }, [])

  const handleFileInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || [])
      if (selectedFiles.length > 0) {
        handleFilesSelected(selectedFiles)
      }
      // Reset input so same files can be selected again if needed
      event.target.value = ''
    },
    [handleFilesSelected],
  )

  const readyToMerge = videoFiles.length >= 2

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over.id) {
        setVideoFiles((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)

          return arrayMove(items, oldIndex, newIndex)
        })
      }
    },
    [],
  )

  const removeVideo = React.useCallback((id: string) => {
    setVideoFiles((prev) => prev.filter((vf) => vf.id !== id))
    // If we remove a video and drop below 2, reset ready status if valid
    if (videoFiles.length <= 2) {
       // Logic handled by readyToMerge
    }
  }, [videoFiles.length])

  const mergeVideos = React.useCallback(async () => {
    if (videoFiles.length < 2) {
      setErrorMessage('Select at least two video files to merge.')
      setStatus('error')
      return
    }

    const runtime = mediabunny ?? (await reload().catch(() => null))

    if (!runtime) {
      setErrorMessage('Unable to load Mediabunny. Please try again.')
      setStatus('error')
      return
    }

    setStatus('converting')
    setProgress(0)
    setErrorMessage(null)
    setMergedVideoUrl(null)

    let output: InstanceType<Mediabunny['Output']> | null = null
    let videoSource: InstanceType<Mediabunny['VideoSampleSource']> | null = null
    let audioSource: InstanceType<Mediabunny['AudioSampleSource']> | null = null

    const inputs: Array<InstanceType<Mediabunny['Input']>> = []
    const videoTracks: any[] = []
    const audioTracks: any[] = []

    try {
      // Load all videos and get their tracks
      for (const videoFile of videoFiles) {
        const input = await createBlobInput(videoFile.file, runtime)
        inputs.push(input)

        const tracks = await input.getVideoTracks()
        if (!tracks.length) {
          throw new Error(`Video "${videoFile.file.name}" does not contain a video track.`)
        }
        videoTracks.push(tracks[0])

        const audioTracksForVideo = await input.getAudioTracks()
        audioTracks.push(audioTracksForVideo.length > 0 ? audioTracksForVideo[0] : null)
      }

      // Get the first video's resolution (we'll resize all others to match)
      const firstVideoSink = new runtime.VideoSampleSink(videoTracks[0])
      let firstSample: InstanceType<Mediabunny['VideoSample']> | null = null
      for await (const sample of firstVideoSink.samples()) {
        firstSample = sample
        break 
      }
      
      if (!firstSample) {
        throw new Error('Unable to read first video dimensions.')
      }

      const targetWidth = firstSample.displayWidth
      const targetHeight = firstSample.displayHeight
      firstSample.close()

      // Create output
      const { output: createdOutput, target, format } = createMp4Output(runtime)
      output = createdOutput

      // Setup video source
      videoSource = new runtime.VideoSampleSource({
        codec: 'avc',
        bitrate: 4_000_000,
      })
      output.addVideoTrack(videoSource, { 
        frameRate: 30,
      })

      // Setup audio source
      audioSource = new runtime.AudioSampleSource({
        codec: 'aac',
        bitrate: 192_000,
      })
      output.addAudioTrack(audioSource)

      await output.start()

      let currentTimestamp = 0
      const totalVideos = videoFiles.length

      // Process each video
      for (let i = 0; i < videoTracks.length; i++) {
        const track = videoTracks[i]
        const audioTrack = audioTracks[i]

        setProgress(Math.round((i / totalVideos) * 90))

        // Check if resize needed
        let needsResize = false
        // First video is reference
        if (i > 0) {
          const checkSink = new runtime.VideoSampleSink(track)
          for await (const checkSample of checkSink.samples()) {
            if (checkSample.displayWidth !== targetWidth || checkSample.displayHeight !== targetHeight) {
              needsResize = true
            }
            checkSample.close()
            break
          }
        }

        if (needsResize) {
          // Resize logic via Conversion API
          const tempOutput = createMp4Output(runtime)
          const conversion = await runtime.Conversion.init({
            input: inputs[i]!,
            output: tempOutput.output,
            video: {
              forceTranscode: true,
              process: (sample: any) => {
                const canvas = document.createElement('canvas')
                canvas.width = targetWidth
                canvas.height = targetHeight
                const ctx = canvas.getContext('2d')!
                sample.draw(ctx, 0, 0, targetWidth, targetHeight)
                return canvas
              },
            },
            audio: {
              forceTranscode: true,
            },
          })

          if (conversion.isValid) {
            await conversion.execute()
            const resizedBuffer = tempOutput.target.buffer
            if (resizedBuffer) {
              const resizedBlob = new Blob([resizedBuffer], { type: tempOutput.format.mimeType })
              const resizedInput = await createBlobInput(
                new File([resizedBlob], `resized-${i}.mp4`),
                runtime,
              )
              const resizedTracks = await resizedInput.getVideoTracks()
              const resizedAudioTracks = await resizedInput.getAudioTracks()
              if (resizedTracks.length > 0) {
                const resizedSink = new runtime.VideoSampleSink(resizedTracks[0]!)
                let lastVideoTimestamp = 0
                for await (const sample of resizedSink.samples()) {
                  const adjusted = sample.clone()
                  adjusted.setTimestamp(sample.timestamp + currentTimestamp)
                  await videoSource!.add(adjusted)
                  sample.close()
                  adjusted.close()
                  lastVideoTimestamp = Math.max(lastVideoTimestamp, sample.timestamp + sample.duration)
                }

                if (audioSource && resizedAudioTracks.length > 0) {
                   try {
                     const audioSink = new runtime.AudioSampleSink(resizedAudioTracks[0] as any)
                     for await (const sample of audioSink.samples()) {
                       const adjusted = sample.clone()
                       adjusted.setTimestamp(sample.timestamp + currentTimestamp)
                       await audioSource.add(adjusted)
                       sample.close()
                       adjusted.close()
                     }
                   } catch (err) {
                      // ignore audio error
                   }
                }
                currentTimestamp += lastVideoTimestamp
                resizedInput.dispose()
                continue
              }
              resizedInput.dispose()
            }
          }
        }

        // Normal processing (no resize)
        const videoSink = new runtime.VideoSampleSink(track)
        let lastVideoTimestamp = 0
        for await (const sample of videoSink.samples()) {
          const adjusted = sample.clone()
          adjusted.setTimestamp(sample.timestamp + currentTimestamp)
          await videoSource!.add(adjusted)
          sample.close()
          adjusted.close()
          lastVideoTimestamp = Math.max(lastVideoTimestamp, sample.timestamp + sample.duration)
        }

        if (audioSource && audioTrack !== null) {
          try {
            const audioSink = new runtime.AudioSampleSink(audioTrack as any)
            for await (const sample of audioSink.samples()) {
               const adjusted = sample.clone()
               adjusted.setTimestamp(sample.timestamp + currentTimestamp)
               await audioSource.add(adjusted)
               sample.close()
               adjusted.close()
            }
          } catch (err) {
            // ignore
          }
        }

        currentTimestamp += lastVideoTimestamp
      }

      videoSource?.close()
      audioSource?.close()

      await output.finalize()

      const buffer = target.buffer
      if (!buffer) {
        throw new Error('No video data produced.')
      }

      const blob = new Blob([buffer], { type: format.mimeType })
      const url = URL.createObjectURL(blob)
      const filename = buildOutputName(videoFiles.map((vf) => vf.file.name), format.fileExtension)
      
      setMergedVideoUrl(url)
      setMergedVideoName(filename)
      setProgress(100)
      setStatus('success')
    } catch (err) {
      console.error(err)
      const message =
        err instanceof Error ? err.message : 'Video merging failed. Please try again.'
      setErrorMessage(message)
      setStatus('error')
      setProgress(0)
    } finally {
      // Cleanup
      try {
        videoSource?.close()
      } catch(e) {}
      try {
        audioSource?.close()
      } catch(e) {}
      
      inputs.forEach((input) => {
        try { input.dispose() } catch(e) {} 
      })
    }
  }, [videoFiles, mediabunny, reload])

  const disabled = status === 'converting' || loading

  const handleDownload = () => {
    if (mergedVideoUrl && mergedVideoName) {
      triggerDownload(mergedVideoUrl, mergedVideoName)
    }
  }

  const handleReset = () => {
    setMergedVideoUrl(null)
    setMergedVideoName(null)
    setStatus('idle')
    setVideoFiles([])
    setProgress(0)
  }

  // --- Render ---

  if (mergedVideoUrl) {
    return (
      <div className="flex flex-col gap-6 max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Merged Video Result</h2>
          <Button variant="ghost" onClick={() => {
              setMergedVideoUrl(null)
              setStatus('ready')
            }}>
             Back to Edit
          </Button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg border border-gray-200">
            {/* Custom player to handle preview state */}
            <VideoPreviewPlayer 
               url={mergedVideoUrl}
            />
        </div>

        <div className="flex items-center gap-4 justify-end">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          {/* Download button moved inside player or keep here? Keep here as well. */}
          <Button onClick={handleDownload} className="bg-orange-600 hover:bg-orange-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download 
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-8">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900">Merge Videos</h2>
        <p className="text-sm text-gray-500">Combine multiple clips into a single video file.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="video-files" className="block text-sm font-medium text-gray-700">
            Video Files 
            <span className="text-gray-400 font-normal ml-1">(Drag to reorder)</span>
            </label>
            
            {(videoFiles.length > 0) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm mb-4">
                <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                >
                <SortableContext
                    items={videoFiles.map((vf) => vf.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                    {videoFiles.map((videoFile, index) => (
                        <SortableVideoItem
                        key={videoFile.id}
                        videoFile={videoFile}
                        index={index}
                        onRemove={() => removeVideo(videoFile.id)}
                        disabled={status === 'converting'}
                        />
                    ))}
                    </div>
                </SortableContext>
                </DndContext>
            </div>
            )}

            <div className="flex gap-2">
                 <input
                    id="add-video-files"
                    type="file"
                    accept="video/*"
                    multiple
                    disabled={status === 'converting'}
                    onChange={handleFileInputChange}
                    className="sr-only"
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('add-video-files')?.click()}
                    disabled={status === 'converting'}
                    className="w-full h-12 border-dashed border-2"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {videoFiles.length > 0 ? 'Add more videos' : 'Select videos to merge'}
                </Button>
            </div>
        </div>

        {errorMessage && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
                {errorMessage}
            </div>
        )}

        {(status === 'converting' || progress > 0) && (
          <div className="space-y-2">
             <div className="flex justify-between text-xs text-gray-500">
                 <span>Processing...</span>
                 <span>{progress}%</span>
             </div>
             <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
            onClick={mergeVideos}
            disabled={disabled || !readyToMerge}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-md disabled:bg-gray-300 disabled:shadow-none"
            size="lg"
        >
            {status === 'converting' ? 'Merging Videos...' : 'Merge Videos'}
        </Button>
      </div>
    </div>
  )
}

// Local component to handle playback logic cleanly
function VideoPreviewPlayer({ url }: { url: string }) {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)

    const togglePlay = () => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }
    
    const handleEnded = () => {
        setIsPlaying(false)
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value)
        if (videoRef.current) {
            videoRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="space-y-4">
             <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg border border-gray-200 group">
                <video 
                    ref={videoRef}
                    src={url}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onClick={togglePlay}
                />
                
                {/* Overlay Play Button */}
                {!isPlaying && (
                    <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                        onClick={togglePlay}
                    >
                        <div className="p-4 rounded-full bg-white/90 hover:bg-white transition-colors shadow-xl">
                             <div className="h-8 w-8 ml-1 border-l-[16px] border-y-[10px] border-l-gray-900 border-y-transparent" />
                        </div>
                    </div>
                )}
                
                {/* Controls Bar */}
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3 text-white">
                        <button onClick={togglePlay} className="hover:text-orange-400">
                            {isPlaying ? (
                                <div className="h-4 w-4 border-l-4 border-r-4 border-current" />
                            ) : (
                                <div className="h-4 w-4 border-l-[10px] border-y-[6px] border-l-current border-y-transparent" />
                            )}
                        </button>
                        
                        <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                        
                        <input 
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-1 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                        />
                    </div>
                 </div>
             </div>
        </div>
    )
}




type SortableVideoItemProps = {
  videoFile: VideoFile
  index: number
  onRemove: () => void
  disabled: boolean
}

function SortableVideoItem({ videoFile, index, onRemove, disabled }: SortableVideoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: videoFile.id,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 rounded-md border border-gray-100 bg-gray-50/50 px-3 py-2 text-sm',
        isDragging && 'shadow-lg border-orange-200 bg-orange-50',
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          'cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-1',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-600">
        {index + 1}
      </span>
      
      <p className="flex-1 truncate font-medium text-gray-700">{videoFile.file.name}</p>
      
      <span className="text-xs text-gray-400">
          {(videoFile.file.size / (1024 * 1024)).toFixed(1)} MB
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
        disabled={disabled}
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

function buildOutputName(fileNames: string[], extension: string) {
  const base = fileNames
    .slice(0, 2)
    .map((name) => name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-').toLowerCase())
    .join('-plus')
  
  if (fileNames.length > 2) {
      return `${base}-and-others-merged${extension}`
  }
  return `${base}-merged${extension}`
}

function triggerDownload(url: string, filename: string) {
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}
