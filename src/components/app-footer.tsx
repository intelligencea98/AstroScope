
import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function AppFooter() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Logo className="size-6 text-primary" />
          <span className="font-headline text-lg font-semibold">
            AstroScope
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          &copy; {new Date().getFullYear()} AstroScope. All rights reserved. <br className="sm:hidden" />
          Data sourced from NASA &amp; Celestrak.
        </p>
        <div className="flex items-center gap-4 text-sm font-medium flex-wrap justify-center">
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/tools"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <Link
            href="/settings"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
           <Link
            href="/terms"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </Link>
           <Link
            href="/privacy"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
