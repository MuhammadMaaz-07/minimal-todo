import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">404</p>
        <h1 className="text-3xl font-light tracking-tight mb-3">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm text-primary hover:opacity-80 transition-opacity">
          <ArrowLeft className="size-4" /> Back to home
        </button>
      </div>
    </div>
  );
}