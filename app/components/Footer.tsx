import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../utils/asset';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-4 sm:px-8 border-t-2 border-gray-800 bg-black/80 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-md"></div>
              <Image
                src={getAssetPath('/TAG_Vector.svg')}
                alt="TAG Logo"
                width={70}
                height={70}
                className="object-contain relative z-10 w-14 h-14 sm:w-16 sm:h-16"
                priority
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-mono font-bold tracking-wider">[GUILD_CREST]</div>
              <div className="text-xs text-gray-600">EST. 2019 • VIT VELLORE</div>
            </div>
          </div>

          {/* Nav links in footer with mobile-friendly touch targets */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/#about' },
              { name: 'Events', href: '/events' },
              { name: 'Clips', href: '/clips' },
              { name: 'Team', href: '/team' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-yellow-400 transition-colors text-xs font-mono tracking-wider px-2.5 py-2 min-h-[40px] flex items-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="text-gray-400 text-xs sm:text-sm font-mono mb-1">
              © {currentYear} TAG CLUB VIT • SEASON {currentYear}
            </div>
            <div className="text-gray-600 text-[11px] sm:text-xs font-mono flex flex-wrap items-center gap-2 justify-center">
              <span>⚡ EMPOWERING INNOVATION IN TECH &amp; GAMING</span>
              <span className="w-1 h-1 bg-yellow-400 rounded-full hidden sm:inline"></span>
              <span>v4.2.0</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-500 font-mono bg-gray-950 border border-gray-800 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>SERVER STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
