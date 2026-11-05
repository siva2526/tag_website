'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from './Toast';
import { triggerEasterEgg, recordInteraction } from './EasterEggs';
import { openCommandPalette } from './CommandPalette';
import { playBlip, playSelect, playPowerUp } from './SoundEffects';

interface SecretTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: number;
  text: string;
  type?: 'input' | 'output' | 'error' | 'success';
}

interface BattleState {
  active: boolean;
  bossHp: number;
  playerHp: number;
}

export default function SecretTerminal({ isOpen, onClose }: SecretTerminalProps) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    { id: 1, text: 'TAG GUILD TERMINAL v4.2.0 [VIT-01]', type: 'success' },
    { id: 2, text: 'Type "help" to see available directives, or "boss" to initiate combat.', type: 'output' },
  ]);
  const [battle, setBattle] = useState<BattleState>({
    active: false,
    bossHp: 100,
    playerHp: 100,
  });
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

    const inputLog: CommandLog = { id: Date.now(), text: battle.active ? `[COMBAT] > ${input}` : `$ ${input}`, type: 'input' };
    const nextLogs = [...logs, inputLog];

    // Check if in active boss battle
    if (battle.active) {
      if (cmd === 'attack' || cmd === '1') {
        playSelect();
        const playerDmg = Math.floor(Math.random() * 15) + 22;
        const newBossHp = Math.max(0, battle.bossHp - playerDmg);

        if (newBossHp === 0) {
          playPowerUp();
          setBattle({ active: false, bossHp: 0, playerHp: 100 });
          nextLogs.push({
            id: Date.now() + 1,
            text: `💥 CRITICAL STRIKE! You dealt ${playerDmg} DMG!\n\n🏆 VICTORY! [SEGFAULT DRAGON SLAIN]\nAll memory leaks resolved. Guild XP +5,000 granted!\nDirectives restored.`,
            type: 'success',
          });
          showToast('🐉 BOSS DEFEATED! [SEGFAULT DRAGON SLAIN] +5,000 XP', { type: 'xp', icon: '🐉' });
          recordInteraction('pity');
          setLogs(nextLogs);
          setInput('');
          return;
        }

        const bossDmg = Math.floor(Math.random() * 12) + 12;
        const newPlayerHp = Math.max(0, battle.playerHp - bossDmg);

        if (newPlayerHp === 0) {
          playBlip();
          setBattle({ active: false, bossHp: 100, playerHp: 100 });
          nextLogs.push({
            id: Date.now() + 1,
            text: `💥 You dealt ${playerDmg} DMG! [Dragon HP: ${newBossHp}/100]\n🔥 Dragon breathed Core Dump flames for ${bossDmg} DMG!\n\n💀 YOU DIED! Process terminated (SIGSEGV). Type "boss" to try again.`,
            type: 'error',
          });
          setLogs(nextLogs);
          setInput('');
          return;
        }

        setBattle({ active: true, bossHp: newBossHp, playerHp: newPlayerHp });
        nextLogs.push({
          id: Date.now() + 1,
          text: `🗡️ Guild Blade dealt ${playerDmg} DMG! [Dragon HP: ${newBossHp}/100]\n🔥 Dragon swiped with NullPointerException for ${bossDmg} DMG! [Your HP: ${newPlayerHp}/100]\nCommands: 1.attack | 2.cast | 3.heal | 4.flee`,
          type: 'output',
        });
        setLogs(nextLogs);
        setInput('');
        return;
      }

      if (cmd === 'cast' || cmd === 'spell' || cmd === '2') {
        playSelect();
        const playerDmg = Math.floor(Math.random() * 20) + 32;
        const newBossHp = Math.max(0, battle.bossHp - playerDmg);

        if (newBossHp === 0) {
          playPowerUp();
          setBattle({ active: false, bossHp: 0, playerHp: 100 });
          nextLogs.push({
            id: Date.now() + 1,
            text: `⚡ OVERCLOCK SHADER dealt ${playerDmg} ELECTRICAL DMG!\n\n🏆 VICTORY! [SEGFAULT DRAGON SLAIN]\nAll memory leaks resolved. Guild XP +5,000 granted!\nDirectives restored.`,
            type: 'success',
          });
          showToast('🐉 BOSS DEFEATED! [SEGFAULT DRAGON SLAIN] +5,000 XP', { type: 'xp', icon: '🐉' });
          recordInteraction('pity');
          setLogs(nextLogs);
          setInput('');
          return;
        }

        const bossDmg = Math.floor(Math.random() * 15) + 16;
        const newPlayerHp = Math.max(0, battle.playerHp - bossDmg);

        if (newPlayerHp === 0) {
          playBlip();
          setBattle({ active: false, bossHp: 100, playerHp: 100 });
          nextLogs.push({
            id: Date.now() + 1,
            text: `⚡ Shader hit for ${playerDmg} DMG! [Dragon HP: ${newBossHp}/100]\n🔥 Dragon countered with Stack Overflow for ${bossDmg} DMG!\n\n💀 YOU DIED! Process terminated. Type "boss" to try again.`,
            type: 'error',
          });
          setLogs(nextLogs);
          setInput('');
          return;
        }

        setBattle({ active: true, bossHp: newBossHp, playerHp: newPlayerHp });
        nextLogs.push({
          id: Date.now() + 1,
          text: `⚡ Shader hit for ${playerDmg} DMG! [Dragon HP: ${newBossHp}/100]\n🔥 Dragon countered with Stack Overflow for ${bossDmg} DMG! [Your HP: ${newPlayerHp}/100]\nCommands: 1.attack | 2.cast | 3.heal | 4.flee`,
          type: 'output',
        });
        setLogs(nextLogs);
        setInput('');
        return;
      }

      if (cmd === 'heal' || cmd === 'potion' || cmd === '3') {
        playBlip();
        const healedHp = Math.min(100, battle.playerHp + 35);
        const bossDmg = Math.floor(Math.random() * 10) + 8;
        const finalHp = Math.max(1, healedHp - bossDmg);

        setBattle({ active: true, bossHp: battle.bossHp, playerHp: finalHp });
        nextLogs.push({
          id: Date.now() + 1,
          text: `🧪 Drank Thermal Paste Elixir (+35 HP)! Dragon nipped for ${bossDmg} DMG.\n[Your HP: ${finalHp}/100 | Dragon HP: ${battle.bossHp}/100]\nCommands: 1.attack | 2.cast | 3.heal | 4.flee`,
          type: 'output',
        });
        setLogs(nextLogs);
        setInput('');
        return;
      }

      if (cmd === 'flee' || cmd === 'run' || cmd === '4') {
        playBlip();
        setBattle({ active: false, bossHp: 100, playerHp: 100 });
        nextLogs.push({
          id: Date.now() + 1,
          text: '💨 Retreated to the lobby! Combat terminated. System shell restored.',
          type: 'output',
        });
        setLogs(nextLogs);
        setInput('');
        return;
      }

      nextLogs.push({
        id: Date.now() + 1,
        text: 'Unknown combat directive! Valid commands:\n 1. attack\n 2. cast\n 3. heal\n 4. flee',
        type: 'error',
      });
      setLogs(nextLogs);
      setInput('');
      return;
    }

    switch (cmd) {
      case 'help':
        nextLogs.push({
          id: Date.now() + 1,
          text: 'AVAILABLE DIRECTIVES:\n • sudo join tag - Join Discord guild\n • boss / battle - Challenge the Segfault Dragon\n • palette       - Open Command Palette (Ctrl+K)\n • xp            - Claim free guild XP\n • status        - Check cluster telemetry\n • whoami        - View player profile\n • clear         - Clear terminal display\n\nCHEATS & EASTER EGGS:\n • youdied       - Elden Ring death screen\n • 500kg         - Helldivers 2 orbital stratagem\n • ace           - Valorant 5K ace kill fanfare\n • wish          - Genshin/Star Rail 5-star pull\n • sandevistan   - Cyberpunk neural dilation\n • diamonds      - Minecraft advancement\n • exit          - Close terminal',
          type: 'output',
        });
        break;

      case 'boss':
      case 'battle':
      case 'fight':
        playPowerUp();
        setBattle({ active: true, bossHp: 100, playerHp: 100 });
        nextLogs.push({
          id: Date.now() + 1,
          text: `
  <>=======()
 (\\/\\___   /|\\\\          [SEGFAULT DRAGON - LVL 99]
       \\_/ | \\\\         BOSS HP: 100 / 100
        /  /\\ \\\\        YOUR HP: 100 / 100
       /  /  \\ \\\\
 
⚠️ WARNING: CORRUPTED HEAP DETECTED!
COMBAT COMMANDS:
 • "attack" (or "1") - Guild Blade Slash (22-36 DMG)
 • "cast"   (or "2") - Overclock Shader (32-51 DMG)
 • "heal"   (or "3") - Thermal Paste Elixir (+35 HP)
 • "flee"   (or "4") - Retreat to Shell`,
          type: 'success',
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
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-[#0c0c12] border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#fff400] font-mono text-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-zinc-900/80 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center -ml-1 rounded hover:bg-zinc-800 transition-colors"
              aria-label="Close terminal"
            >
              <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
            </button>
            <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
            <span className="ml-2 text-xs text-zinc-400 font-mono truncate max-w-[140px] sm:max-w-none">
              guild-shell ~ (bash)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-yellow-400 transition-colors text-xs font-bold px-3 py-1.5 min-h-[36px] flex items-center justify-center"
            aria-label="Close terminal"
          >
            ESC ✕
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 max-h-[50vh] sm:max-h-[380px] overflow-y-auto space-y-2 select-text bg-zinc-950/50">
          {logs.map(log => (
            <div
              key={log.id}
              className={`whitespace-pre-wrap leading-relaxed text-xs sm:text-sm ${
                log.type === 'input'
                  ? 'text-yellow-400 font-bold'
                  : log.type === 'success'
                  ? 'text-emerald-400'
                  : log.type === 'error'
                  ? 'text-rose-400'
                  : 'text-zinc-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-zinc-900/80 border-t border-white/[0.08]">
          <span className={battle.active ? "text-rose-400 font-bold" : "text-yellow-400 font-bold"}>
            {battle.active ? '⚔️' : '>'}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={battle.active ? "1. attack | 2. cast | 3. heal | 4. flee" : "type 'boss', 'sudo join tag', or 'help'..."}
            className="flex-1 bg-transparent text-white font-mono outline-none text-xs sm:text-sm placeholder:text-zinc-600 min-h-[38px]"
          />
          <button
            type="submit"
            className={`text-xs font-bold px-3 py-1.5 min-h-[36px] rounded-lg border transition-colors shrink-0 ${
              battle.active
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'text-yellow-400 hover:text-yellow-300 bg-yellow-400/10 border-yellow-400/30'
            }`}
          >
            {battle.active ? 'STRIKE' : 'EXECUTE'}
          </button>
        </form>
      </div>
    </div>
  );
}
