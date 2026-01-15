import type * as MediabunnyModule from 'mediabunny'

type MediabunnyImport = typeof MediabunnyModule

let mediabunnyPromise: Promise<MediabunnyImport> | null = null

function ensureBrowserContext() {
  if (typeof window === 'undefined') {
    throw new Error('Mediabunny can only be used in the browser environment.')
  }
}

export async function loadMediabunny(): Promise<MediabunnyImport> {
  ensureBrowserContext()

  if (!mediabunnyPromise) {
    mediabunnyPromise = (import('mediabunny') as Promise<MediabunnyImport>).catch((error) => {
      mediabunnyPromise = null
      throw error
    })
  }

  return mediabunnyPromise
}

export type { MediabunnyImport }

export async function createBlobInput(
  file: File,
  moduleOverride?: MediabunnyImport,
  formatsOverride?: Array<InstanceType<MediabunnyImport['InputFormat']>>,
) {
  const mediabunny = moduleOverride ?? (await loadMediabunny())
  const formats =
    formatsOverride ??
    (mediabunny.ALL_FORMATS as Array<InstanceType<MediabunnyImport['InputFormat']>>)

  return new mediabunny.Input({
    source: new mediabunny.BlobSource(file, { maxCacheSize: 32 * 1024 * 1024 }),
    formats,
  })
}

export type AudioContainer = 'mp3' | 'wav' | 'ogg' | 'flac' | 'adts'

const audioFormatFactories: Record<
  AudioContainer,
  (module: MediabunnyImport) => InstanceType<
    | MediabunnyImport['Mp3OutputFormat']
    | MediabunnyImport['WavOutputFormat']
    | MediabunnyImport['OggOutputFormat']
    | MediabunnyImport['FlacOutputFormat']
    | MediabunnyImport['AdtsOutputFormat']
  >
> = {
  mp3: (module) => new module.Mp3OutputFormat(),
  wav: (module) => new module.WavOutputFormat(),
  ogg: (module) => new module.OggOutputFormat(),
  flac: (module) => new module.FlacOutputFormat(),
  adts: (module) => new module.AdtsOutputFormat(),
}

export function createAudioOutput(
  module: MediabunnyImport,
  container: AudioContainer = 'mp3',
) {
  const formatFactory = audioFormatFactories[container]

  if (!formatFactory) {
    throw new Error(`Unsupported audio container: ${container}`)
  }

  const format = formatFactory(module)
  const target = new module.BufferTarget()
  const output = new module.Output({ format, target })

  return { output, target, format }
}

export function createMp4Output(module: MediabunnyImport) {
  const format = new module.Mp4OutputFormat()
  const target = new module.BufferTarget()
  const output = new module.Output({ format, target })

  return { output, target, format }
}
