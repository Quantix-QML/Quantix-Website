import Image from "next/image";

export function LogoMark({ size = 32, className, priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      className={className}
      src="/quantix-logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
    />
  );
}
