import { auth } from "@/auth";
import Link from "next/link";
import HeaderNav from "./header-nav";
import { Cpu } from "lucide-react";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl transition-all hover:opacity-80 active:scale-95"
          >
            <div className="relative">
              <Cpu size={28} className="text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              PC Builder
            </span>
          </Link>
        </div>
        <nav className="min-w-0 flex-1">
          <HeaderNav session={session} />
        </nav>
      </div>
    </header>
  );
}