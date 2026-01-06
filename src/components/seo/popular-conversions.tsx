import Link from "next/link";
import { VALID_CONVERSIONS } from "@/config/conversions";
import { cn } from "@/lib/utils";

export default function PopularConversions() {
  const conversions = VALID_CONVERSIONS;

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
          Popular Conversions
        </h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
          Convert Between Any Format
        </p>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          Our tool supports dozens of conversion pairs. Click any link below to jump straight to that specific converter.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {conversions.map(({ from, to }) => {
          const slug = `${from}-to-${to}`;
          const href = `/tools/${slug}`;
          const label = `${from.toUpperCase()} to ${to.toUpperCase()}`;
          return (
            <Link
              key={slug}
              href={href}
              className={cn(
                "group block rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
                "p-4 shadow-md ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-lg transition-shadow",
                "text-center hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-400",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              )}
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {label}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {from} → {to}
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        All conversions run 100% in your browser. No uploads, no data sharing.
      </p>
    </section>
  );
}