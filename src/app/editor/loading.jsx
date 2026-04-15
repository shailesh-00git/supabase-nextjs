import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-screen grid place-content-center">
      <Spinner></Spinner>
    </div>
  );
}
