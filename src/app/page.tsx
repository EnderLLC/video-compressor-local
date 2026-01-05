"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, BoltIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoProcessor } from "@/hooks/use-video-process";
import FAQSection from "@/components/home/faq-section";
import AdPlaceholder from "@/components/ui/ad-placeholder";

const navigation = [
  // Remove extra links, keep only GitHub if needed
];

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    loadFFmpeg,
    compressVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoProcessor();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically load FFmpeg when component mounts? We'll load on demand.
  useEffect(() => {
    // Optionally load FFmpeg early for better UX
    // loadFFmpeg();
  }, []);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await compressVideo(selectedFile);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `compressed-${selectedFile.name}` : "compressed-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">LocalCompress</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto dark:hidden"
              />
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto not-dark:hidden"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* GitHub link or other */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              GitHub
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">LocalCompress</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto not-dark:hidden"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  {/* No navigation items */}
                </div>
                <div className="py-6">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
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
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
              The world's first 100% browser‑based video compressor{" "}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
              Compress Videos Instantly, Without Losing Privacy
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              The world's first 100% browser‑based video compressor. Your files never leave your device.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/* Replace buttons with our Dropzone and AdPlaceholder */}
              <div className="w-full max-w-lg">
                {!selectedFile ? (
                  <>
                    <VideoDropzone
                      onFileSelected={handleFileSelected}
                      disabled={isProcessing}
                    />
                    <AdPlaceholder className="mt-6" />
                  </>
                ) : (
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Compression Progress</CardTitle>
                      <CardDescription>
                        Your video is being processed locally in your browser.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={handleCompress}
                          disabled={!selectedFile || isProcessing || (loading && !loaded)}
                          className="min-w-32"
                        >
                          {isProcessing ? "Processing..." : loading ? "Loading FFmpeg..." : "Compress Video"}
                        </Button>
                        {loaded && !isProcessing && (
                          <span className="text-green-600 font-semibold">✓ FFmpeg ready</span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {(isProcessing || loading) && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} />
                        </div>
                      )}

                      {/* Error Alert */}
                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                          <p className="font-semibold">Error</p>
                          <p className="text-sm">{error}</p>
                        </div>
                      )}

                      {/* Download Section */}
                      {outputUrl && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="font-semibold text-green-800">Compression successful!</p>
                          <p className="text-sm text-green-700 mb-4">
                            Your video has been compressed and is ready to download.
                          </p>
                          <div className="flex gap-4">
                            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                              Download Video
                            </Button>
                            <Button variant="outline" onClick={reset}>
                              Process Another
                            </Button>
                          </div>
                          <AdPlaceholder className="mt-4" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
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
      <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Why Choose Us</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Everything you need to compress videos securely
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              Our technology ensures your videos stay private while delivering fast, high‑quality compression—all in your browser.
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

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <p className="mt-10 text-center text-sm/6 text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} LocalCompress. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
