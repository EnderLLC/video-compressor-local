import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  className?: string;
  label?: string;
}

export default function AdPlaceholder({
  className,
  label = "Advertisement",
}: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "w-full h-[100px] bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm",
        className
      )}
    >
      {label}
    </div>
  );
}