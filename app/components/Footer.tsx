import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../utils/asset';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-8 border-t-2 border-gray-800 bg-black/80 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-md"></div>
              <Image
                src={getAssetPath('/TAG_Vector.svg')}
                alt="TAG Logo"
                width={80}
                height={80}
                className="object-contain relative z-10"
                priority
              />
            </div>
            <div className="hidden md:block">
              <div className="text-xs text-gray-600 font-mono">[GUILD_CREST]</div>
              <div className="text-xs text-gray-700">EST. 2019</div>
            </div>
          </div>

          {/* Nav links in footer */}
          <div className="flex flex-wrap gap-6 justify-center">
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
                className="text-gray-500 hover:text-yellow-400 transition-colors text-xs font-mono tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="text-gray-500 text-sm font-mono mb-1">
              © {currentYear} TAG CLUB VIT • SEASON {currentYear}
            </div>
            <div className="text-gray-700 text-xs font-mono flex items-center gap-2 justify-center">
              <span>⚡ EMPOWERING INNOVATION IN TECH &amp; GAMING</span>
              <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
              <span>v4.2.0</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>SERVER STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
