import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
};

/**
 * Slider de comparação antes/depois.
 * Para usar fotos reais, troque apenas os imports das imagens em src/assets
 * (use o MESMO aparelho, mesmo ângulo, antes e depois da limpeza).
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Ar-condicionado antes da limpeza",
  afterAlt = "Ar-condicionado depois da limpeza",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const up = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-2xl border border-border bg-muted select-none shadow-[var(--shadow-soft)] sm:aspect-[16/10]"
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-foreground/80 px-3 py-1 text-xs font-semibold tracking-wide text-background">
        ANTES
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground">
        DEPOIS
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 wave-rule"
        style={{ left: `${pos}%` }}
      />
      <button
        type="button"
        role="slider"
        aria-label="Arraste para comparar antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        }}
        className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-border bg-background shadow-[var(--shadow-soft)]"
        style={{ left: `${pos}%` }}
      >
        <span className="text-sm font-bold text-primary">‹›</span>
      </button>
    </div>
  );
}