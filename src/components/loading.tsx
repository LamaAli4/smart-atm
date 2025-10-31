export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-sidebar-ring border-t-transparent rounded-full animate-spin"></div>

        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
