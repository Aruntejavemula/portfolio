import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted font-mono">
          &copy; {new Date().getFullYear()} Arun Teja V. Built with Next.js.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/Aruntejavemula"
            target="_blank"
            className="text-sm text-muted hover:text-accent transition-colors font-mono"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/aruntejasunny/"
            target="_blank"
            className="text-sm text-muted hover:text-accent transition-colors font-mono"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:sunnyarunteja@gmail.com"
            className="text-sm text-muted hover:text-accent transition-colors font-mono"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
