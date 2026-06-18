import Image from "next/image";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt={brand.name}
      width={500}
      height={112}
      className={cn("h-28 w-auto object-contain", className)}
      priority
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt={brand.name}
      width={640}
      height={128}
      className={cn("h-32 w-auto object-contain", className)}
      priority
    />
  );
}
