import { LoadingOverlay } from "@/components/shared";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <LoadingOverlay />
    </div>
  );
}
