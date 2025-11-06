import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface BirthdayModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
}

export function BirthdayModal({
  isOpen,
  onClose,
  firstName,
}: BirthdayModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Birthday greeting"
      aria-describedby="birthday-desc"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* darker backdrop so content is legible */}
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative z-10 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card/95 text-card-foreground rounded-xl shadow-2xl p-6 text-center border border-border/60 transform transition duration-200">
          <button
            ref={closeBtnRef}
            aria-label="Close birthday dialog"
            onClick={onClose}
            className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-card/90 border border-border hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="mb-3 text-5xl">🎉🎂</div>
          <h3 className="text-2xl font-extrabold text-foreground mb-2">
            Happy Birthday, {firstName || "dear"}!
          </h3>
          <p
            id="birthday-desc"
            className="text-sm text-muted-foreground/95 max-w-lg mx-auto"
          >
            Wishing you a day full of happiness and joy. Enjoy your special day
            — we've added a little surprise to your account!
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm 
              font-semibold text-primary-foreground shadow-sm hover:opacity-95
               focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              Thanks!
            </button>

            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
