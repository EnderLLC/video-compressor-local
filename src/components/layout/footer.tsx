import Link from "next/link";
import { VALID_CONVERSIONS } from "@/config/conversions";

// Pick top 6 conversions (first 6 from the list)
const TOP_CONVERSIONS = VALID_CONVERSIONS.slice(0, 6);

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  href="/compress-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/convert-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/trim-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video Trimmer
                </Link>
              </li>
              <li>
                <Link
                  href="/crop-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video Cropper
                </Link>
              </li>
              <li>
                <Link
                  href="/rotate-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Rotate & Flip
                </Link>
              </li>
              <li>
                <Link
                  href="/remove-audio"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Remove Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/increase-volume"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Volume Booster
                </Link>
              </li>
              <li>
                <Link
                  href="/video-to-gif"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video to GIF
                </Link>
              </li>
              <li>
                <Link
                  href="/video-speed"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video Speed
                </Link>
              </li>
              <li>
                <Link
                  href="/merge-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Video Merger
                </Link>
              </li>
              <li>
                <Link
                  href="/add-audio"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Add Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/reverse-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Reverse Video
                </Link>
              </li>
              <li>
                <Link
                  href="/loop-video"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Loop Video
                </Link>
              </li>
              <li>
                <Link
                  href="/screen-recorder"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Screen Recorder
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Blog
                </Link>
              </li>
              {TOP_CONVERSIONS.map(({ from, to }) => {
                const slug = `${from}-to-${to}`;
                const href = `/tools/${slug}`;
                const label = `${from.toUpperCase()} to ${to.toUpperCase()}`;
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">About</h3>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Local Media Tools provides 100% browser‑based video compression and conversion.
              Your files never leave your device—privacy by design.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm/6 text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Local Media Tools. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}