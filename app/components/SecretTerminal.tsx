'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from './Toast';
import { triggerEasterEgg } from './EasterEggs';
import { openCommandPalette } from './CommandPalette';

interface SecretTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: number;
  text: string;
  type?: 'input' | 'output' | 'error' | 'success';
}

export default function SecretTerminal({ isOpen, onClose }: SecretTerminalProps) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    { id: 1, text: 'TAG GUILD TERMINAL v4.2.0 [VIT-01]', type: 'success' },
    { id: 2, text: 'Type "help" to see available guild directives, or "sudo join tag" to enlist.', type: 'output' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const inputLog: CommandLog = { id: Date.now(), text: `$ ${input}`, type: 'input' };
    const nextLogs = [...logs, inputLog];

    switch (cmd) {
      case 'help':
        nextLogs.push({
          id: Date.now() + 1,
          text: 'AVAILABLE DIRECTIVES:\n • sudo join tag - Join Discord guild\n • palette       - Open Command Palette (Ctrl+K)\n • xp            - Claim free guild XP\n • status        - Check cluster telemetry\n • whoami        - View player profile\n • clear         - Clear terminal display\n\nCHEATS & EASTER EGGS:\n • youdied       - Elden Ring death screen\n • 500kg         - Helldivers 2 orbital stratagem\n • ace           - Valorant 5K ace kill fanfare\n • wish          - Genshin/Star Rail 5-star pull\n • sandevistan   - Cyberpunk neural dilation\n • diamonds      - Minecraft advancement\n • exit          - Close terminal',
          type: 'output',
        });
        break;

      case 'palette':
      case 'search':
      case 'cmd':
        onClose();
        openCommandPalette();
        return;

      case 'eldenring':
      case 'youdied':
        onClose();
        triggerEasterEgg('eldenring');
        return;

      case 'helldivers':
      case '500kg':
      case 'bomb':
        onClose();
        triggerEasterEgg('helldivers');
        return;

      case 'valorant':
      case 'ace':
        onClose();
        triggerEasterEgg('valorant');
        return;

      case 'gacha':
      case 'wish':
      case 'genshin':
        onClose();
        triggerEasterEgg('gacha');
        return;

      case 'sandevistan':
      case 'sandy':
      case 'cyberpunk':
        onClose();
        triggerEasterEgg('sandevistan');
        return;

      case 'minecraft':
      case 'diamonds':
        onClose();
        triggerEasterEgg('minecraft');
        return;

      case 'konami':
        onClose();
        triggerEasterEgg('konami');
        return;

      case 'sudo join tag':
      case 'join tag':
      case 'join':
        nextLogs.push({
          id: Date.now() + 1,
          text: 'ACCESS GRANTED. Teleporting to Guild Discord Headquarters...',
          type: 'success',
        });
        showToast('🚀 Teleporting to Guild Discord...', { type: 'success', icon: '🎮' });
        setTimeout(() => {
          window.open('https://discord.com/invite/Y9cpqdvZE4', '_blank');
        }, 1200);
        break;

      case 'xp':
        nextLogs.push({
          id: Date.now() + 1,
          text: '+1,500 XP GRANTED! You now outrank the average NPC.',
          type: 'success',
        });
        showToast('💎 +1,500 XP Claimed from Secret Terminal!', { type: 'xp', icon: '💎' });
        break;

      case 'status':
        nextLogs.push({
          id: Date.now() + 1,
          text: 'CLUSTER: VIT-01 | HEALTH: 100% | PLAYERS: 842 ONLINE | SEASON: 14 ACTIVE',
          type: 'output',
        });
        break;

      case 'whoami':
        nextLogs.push({
          id: Date.now() + 1,
          text: 'PLAYER: Guild Initiate [LVL.42] | CLASS: TECH_MAGE / WARRIOR HYBRID',
          type: 'output',
        });
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInput('');
        return;

      default:
        nextLogs.push({
          id: Date.now() + 1,
          text: `bash: command not found: "${cmd}". Type "help" for valid directives.`,
          type: 'error',
        });
        break;
    }

    setLogs(nextLogs);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-black border-2 border-yellow-400 rounded-xl overflow-hidden shadow-2xl shadow-yellow-400/20 font-mono text-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center -ml-1 rounded hover:bg-gray-800 transition-colors"
              aria-label="Close terminal"
            >
              <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
            </button>
            <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
            <span className="ml-2 text-xs text-gray-400 font-mono truncate max-w-[140px] sm:max-w-none">
              guild-shell ~ (bash)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-yellow-400 transition-colors text-xs font-bold px-3 py-2 min-h-[40px] flex items-center justify-center"
            aria-label="Close terminal"
          >
            [ESC / ✕]
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 max-h-[50vh] sm:max-h-[380px] overflow-y-auto space-y-2 select-text">
          {logs.map(log => (
            <div
              key={log.id}
              className={`whitespace-pre-wrap leading-relaxed text-xs sm:text-sm ${
                log.type === 'input'
                  ? 'text-yellow-400 font-bold'
                  : log.type === 'success'
                  ? 'text-green-400'
                  : log.type === 'error'
                  ? 'text-red-400'
                  : 'text-gray-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950 border-t border-gray-800">
          <span className="text-yellow-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'sudo join tag' or 'help'..."
            className="flex-1 bg-transparent text-white font-mono outline-none text-xs sm:text-sm placeholder:text-gray-600 min-h-[40px]"
          />
          <button
            type="submit"
            className="text-xs text-yellow-400 hover:text-yellow-300 font-bold px-3 py-2 min-h-[40px] bg-yellow-400/10 rounded-lg border border-yellow-400/30 transition-colors shrink-0"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
}

