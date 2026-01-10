import { LockClosedIcon, BoltIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline";
import FAQSection from "@/components/home/faq-section";
import PopularConversions from "@/components/seo/popular-conversions";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export default function Home() {
  // Feature data updated
  const features = [
    {
      name: "Privacy First",
      description: "Files never leave your browser. Zero server upload.",
      icon: LockClosedIcon,
    },
    {
      name: "Lightning Fast",
      description: "No upload wait time. Processes directly on your CPU.",
      icon: BoltIcon,
    },
    {
      name: "Unlimited Size",
      description: "Compress 1GB, 5GB or 10GB files. No quotas.",
      icon: CloudArrowDownIcon,
    },
  ];

  // Tools grid data – all tools in one array for easy maintenance
  const TOOLS = [
    {
      title: "Video Compressor",
      description: "Reduce video file size securely without uploading. Perfect for saving space or preparing videos for sharing.",
      href: "/compress-video",
      color: "indigo",
      tag: "No uploads",
      icon: (
        <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    {
      title: "Video Converter",
      description: "Convert videos to MP4, MOV, MKV, AVI, MP3, or GIF—all locally. Extract audio or create animated GIFs in seconds.",
      href: "/convert-video",
      color: "emerald",
      tag: "6 formats",
      icon: (
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Video Trimmer",
      description: "Cut precise segments from your videos with stream‑copy (no re‑encode). Keep original quality, trim in seconds.",
      href: "/trim-video",
      color: "amber",
      tag: "Stream‑copy",
      icon: (
        <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243zm0 0l2.879 2.879" />
        </svg>
      ),
    },
    {
      title: "Video Cropper",
      description: "Crop videos to any aspect ratio (1:1, 9:16, 16:9) visually. Select the region you want to keep and export.",
      href: "/crop-video",
      color: "purple",
      tag: "Visual crop",
      icon: (
        <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6M6 6h12v12" />
        </svg>
      ),
    },
    {
      title: "Rotate & Flip",
      description: "Rotate videos 90°, 180°, or flip horizontally/vertically. Fix sideways videos instantly. All processing happens locally.",
      href: "/rotate-video",
      color: "cyan",
      tag: "Orientation",
      icon: (
        <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "Remove Audio",
      description: "Strip the audio track from your videos completely, leaving only the video. No quality loss, processed locally.",
      href: "/remove-audio",
      color: "rose",
      tag: "Mute video",
      icon: (
        <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.531V19.189a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      ),
    },
    {
      title: "Volume Booster",
      description: "Increase or decrease the audio volume of your videos. Choose a multiplier from 50% to 400%. Video stream stays untouched.",
      href: "/increase-volume",
      color: "blue",
      tag: "Volume control",
      icon: (
        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06z" />
        </svg>
      ),
    },
    {
      title: "Audio Converter",
      description: "Extract audio from video or convert sound files between MP3, WAV, AAC, M4A, OGG. All processing happens locally.",
      href: "/audio-converter",
      color: "pink",
      tag: "Audio extractor",
      icon: (
        <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
        </svg>
      ),
    },
    {
      title: "Video to GIF",
      description: "Convert any video to a high‑quality animated GIF with adjustable FPS and size. Everything runs locally, no uploads.",
      href: "/video-to-gif",
      color: "pink",
      tag: "Animated",
      icon: (
        <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Screen Recorder",
      description: "Record your screen, window, or tab directly in your browser. No extensions, no watermarks, unlimited recording time.",
      href: "/screen-recorder",
      color: "red",
      tag: "No uploads",
      icon: (
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Video Speed",
      description: "Change playback speed of your videos (0.5x, 1.5x, 2x, etc). Slow down or speed up without quality loss.",
      href: "/video-speed",
      color: "green",
      tag: "Speed control",
      icon: (
        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Video Merger",
      description: "Combine multiple videos into one seamless file. Reorder clips and merge with stream‑copy for fastest processing.",
      href: "/merge-video",
      color: "violet",
      tag: "Merge",
      icon: (
        <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Add Audio",
      description: "Replace or add a new audio track to your video. Choose from uploaded audio files, keep original video quality.",
      href: "/add-audio",
      color: "orange",
      tag: "Audio muxing",
      icon: (
        <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ),
    },
    {
      title: "Reverse Video",
      description: "Play your video backwards. Reverse both video and audio streams, or keep audio normal. All processing local.",
      href: "/reverse-video",
      color: "yellow",
      tag: "Reverse",
      icon: (
        <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h12" />
        </svg>
      ),
    },
    {
      title: "Loop Video",
      description: "Repeat your video multiple times seamlessly. Choose loop count, uses stream‑copy for lightning‑fast processing.",
      href: "/loop-video",
      color: "teal",
      tag: "Loop",
      icon: (
        <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "Slideshow Maker",
      description: "Turn multiple images into a video slideshow. Set duration per slide, reorder images, create professional slideshows.",
      href: "/slideshow",
      color: "sky",
      tag: "Slideshow",
      icon: (
        <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  {
    title: "Video Resizer",
    description: "Change video aspect ratio for Instagram, TikTok, YouTube (16:9, 9:16, 1:1, 4:5). Fill empty space with black or white background.",
    href: "/resize-video",
    color: "lime",
    tag: "Aspect ratio",
    icon: (
      <svg className="w-8 h-8 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M3 14h11m-11-4h11M3 18h11M3 6h18M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    title: "Thumbnail Generator",
    description: "Extract high‑quality still frames (JPG/PNG) from any video at any timestamp. Works locally, no uploads.",
    href: "/thumbnail-generator",
    color: "teal",
    tag: "Frame extractor",
    icon: (
      <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

  // Color mapping for dynamic class generation
  const colorClasses = {
    indigo: { from: 'indigo', bg: 'indigo', text: 'indigo' },
    emerald: { from: 'emerald', bg: 'emerald', text: 'emerald' },
    amber: { from: 'amber', bg: 'amber', text: 'amber' },
    purple: { from: 'purple', bg: 'purple', text: 'purple' },
    cyan: { from: 'cyan', bg: 'cyan', text: 'cyan' },
    rose: { from: 'rose', bg: 'rose', text: 'rose' },
    blue: { from: 'blue', bg: 'blue', text: 'blue' },
    pink: { from: 'pink', bg: 'pink', text: 'pink' },
    red: { from: 'red', bg: 'red', text: 'red' },
    green: { from: 'green', bg: 'green', text: 'green' },
    violet: { from: 'violet', bg: 'violet', text: 'violet' },
    orange: { from: 'orange', bg: 'orange', text: 'orange' },
    yellow: { from: 'yellow', bg: 'yellow', text: 'yellow' },
    teal: { from: 'teal', bg: 'teal', text: 'teal' },
    sky: { from: 'sky', bg: 'sky', text: 'sky' },
    lime: { from: 'lime', bg: 'lime', text: 'lime' },
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
              All‑in‑One Local Media Tools
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
              All‑in‑One Local Media Tools
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              Compress, convert, and transform videos entirely in your browser. Your files never leave your device.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <div className="w-full max-w-4xl">
                <AdUnit slotId={AD_SLOTS.homepage} format="rectangle" className="mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Video Compressor Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                        <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Video Compressor</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Reduce video file size securely without uploading. Perfect for saving space or preparing videos for sharing.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/compress-video"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        Start Compressing
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        No uploads
                      </span>
                    </div>
                  </div>

                  {/* Video Converter Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Video Converter</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Convert videos to MP4, MOV, MKV, AVI, MP3, or GIF—all locally. Extract audio or create animated GIFs in seconds.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/convert-video"
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-800 dark:hover:text-emerald-300"
                      >
                        Start Converting
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        6 formats
                      </span>
                    </div>
                  </div>

                  {/* Video Trimmer Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
                        <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243zm0 0l2.879 2.879" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Video Trimmer</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Cut precise segments from your videos with stream‑copy (no re‑encode). Keep original quality, trim in seconds.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/trim-video"
                        className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-800 dark:hover:text-amber-300"
                      >
                        Start Trimming
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        Stream‑copy
                      </span>
                    </div>
                  </div>
                  {/* Video Cropper Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                        <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6M6 6h12v12" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Video Cropper</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Crop videos to any aspect ratio (1:1, 9:16, 16:9) visually. Select the region you want to keep and export.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/crop-video"
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-800 dark:hover:text-purple-300"
                      >
                        Start Cropping
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                        Visual crop
                      </span>
                    </div>
                  </div>
                  {/* Rotate & Flip Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-xl">
                        <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Rotate & Flip</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Rotate videos 90°, 180°, or flip horizontally/vertically. Fix sideways videos instantly. All processing happens locally.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/rotate-video"
                        className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-800 dark:hover:text-cyan-300"
                      >
                        Start Rotating
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                        Orientation
                      </span>
                    </div>
                  </div>
                  {/* Remove Audio Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-rose-100 dark:bg-rose-900 rounded-xl">
                        <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.531V19.189a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Remove Audio</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Strip the audio track from your videos completely, leaving only the video. No quality loss, processed locally.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/remove-audio"
                        className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold hover:text-rose-800 dark:hover:text-rose-300"
                      >
                        Start Removing
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                        Mute video
                      </span>
                    </div>
                  </div>
                  {/* Volume Booster Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06z" />
                        </svg>
                      </div>
                  {/* Video to GIF Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-xl">
                        <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Video to GIF</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Convert any video to a high‑quality animated GIF with adjustable FPS and size. Everything runs locally, no uploads.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/video-to-gif"
                        className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 font-semibold hover:text-pink-800 dark:hover:text-pink-300"
                      >
                        Start Converting
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                        Animated
                      </span>
                    </div>
                  </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Volume Booster</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Increase or decrease the audio volume of your videos. Choose a multiplier from 50% to 400%. Video stream stays untouched.
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href="/increase-volume"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Start Boosting
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                        Volume control
                      </span>
                    </div>
                    {/* Screen Recorder Card */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
                          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Screen Recorder</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Record your screen, window, or tab directly in your browser. No extensions, no watermarks, unlimited recording time.
                      </p>
                      <div className="flex items-center justify-between">
                        <a
                          href="/screen-recorder"
                          className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold hover:text-red-800 dark:hover:text-red-300"
                        >
                          Start Recording
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          No uploads
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <AdUnit slotId={AD_SLOTS.homepage} format="leaderboard" className="mt-10" />
                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  All tools run 100% in your browser using WebAssembly. No data is sent to any server.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-white py-12 sm:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Why Choose Us</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Everything you need to process videos securely
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              Our technology ensures your videos stay private while delivering fast, high‑quality compression and conversion—all in your browser.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                      <feature.icon aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
       {/* FAQ Section */}
       <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
         <FAQSection />
       </div>

       <PopularConversions />


    </div>
  );
}
