// Loading spinner component for gallery
export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-amber-600`}></div>
    </div>
  );
}

// Masonry item skeleton loader
export function MasonryItemSkeleton() {
  return (
    <div className="break-inside-avoid mb-4 animate-pulse">
      <div className="bg-gray-200 rounded-xl" style={{ height: `${Math.floor(Math.random() * 200) + 300}px` }}>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
