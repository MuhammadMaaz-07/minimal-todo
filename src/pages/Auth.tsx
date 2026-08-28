import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, ArrowRight, Loader2 } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleGuest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="mx-auto max-w-3xl px-6 py-8 w-full flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary hover:opacity-80 transition-opacity">
          Minimal To-Do
        </button>
        <button onClick={toggle} className="text-muted-foreground hover:text-primary transition-colors p-1">
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          {step === "email" ? (
            <div className="space-y-10">
              <div>
                <h1 className="text-2xl font-light tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground mt-2">Sign in to access your workspace.</p>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Email</label>
                  <input name="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/50" required />
                </div>
                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50">
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <>Continue <ArrowRight className="size-4" /></>}
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground/60 tracking-wider">or</span></div>
                </div>
                <button type="button" onClick={handleGuest} disabled={isLoading} className="w-full border border-border px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-50">
                  Continue as guest
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-10">
              <div>
                <h1 className="text-2xl font-light tracking-tight">Check your inbox</h1>
                <p className="text-sm text-muted-foreground mt-2">We sent a code to <span className="text-foreground font-medium">{email}</span></p>
              </div>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Verification code</label>
                  <input type="text" placeholder="Enter code" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/50 tracking-widest text-center" />
                </div>
                <button type="submit" disabled={isLoading || otp.length < 4} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50">
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <>Verify <ArrowRight className="size-4" /></>}
                </button>
                <button type="button" onClick={() => setStep("email")} disabled={isLoading} className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors">
                  Use a different email
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}