'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Sparkles,
  ChevronDown,
  Cpu,
  Film,
  Database,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NODES = [
  { id: 'c', x: 250, y: 250, r: 7, kind: 'core' },
  { id: 'a1', x: 110, y: 130, r: 4.5, kind: 'hub' },
  { id: 'a2', x: 380, y: 110, r: 4, kind: 'hub' },
  { id: 'a3', x: 430, y: 260, r: 5, kind: 'hub' },
  { id: 'a4', x: 360, y: 410, r: 4.5, kind: 'hub' },
  { id: 'a5', x: 130, y: 390, r: 4, kind: 'hub' },
  { id: 'a6', x: 70, y: 260, r: 4.5, kind: 'hub' },
  { id: 'b1', x: 200, y: 90, r: 2.5, kind: 'leaf' },
  { id: 'b2', x: 310, y: 60, r: 2.5, kind: 'leaf' },
  { id: 'b3', x: 460, y: 180, r: 2.5, kind: 'leaf' },
  { id: 'b4', x: 470, y: 340, r: 2.5, kind: 'leaf' },
  { id: 'b5', x: 260, y: 440, r: 2.5, kind: 'leaf' },
  { id: 'b6', x: 60, y: 340, r: 2.5, kind: 'leaf' },
  { id: 'b7', x: 50, y: 180, r: 2.5, kind: 'leaf' },
  { id: 'b8', x: 200, y: 200, r: 2, kind: 'leaf' },
  { id: 'b9', x: 320, y: 200, r: 2, kind: 'leaf' },
  { id: 'ba', x: 320, y: 310, r: 2, kind: 'leaf' },
  { id: 'bb', x: 200, y: 310, r: 2, kind: 'leaf' },
] as const;

const byId: Record<string, (typeof NODES)[number]> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

const EDGES: ReadonlyArray<readonly [string, string]> = [
  ['c', 'a1'], ['c', 'a2'], ['c', 'a3'], ['c', 'a4'], ['c', 'a5'], ['c', 'a6'],
  ['c', 'b8'], ['c', 'b9'], ['c', 'ba'], ['c', 'bb'],
  ['a1', 'a2'], ['a2', 'a3'], ['a3', 'a4'], ['a4', 'a5'], ['a5', 'a6'], ['a6', 'a1'],
  ['a1', 'b1'], ['a1', 'b7'], ['a2', 'b2'], ['a2', 'b3'],
  ['a3', 'b3'], ['a3', 'b4'], ['a4', 'b4'], ['a4', 'b5'],
  ['a5', 'b5'], ['a5', 'b6'], ['a6', 'b6'], ['a6', 'b7'],
  ['b8', 'b9'], ['b9', 'ba'], ['ba', 'bb'], ['bb', 'b8'],
];

const FLOW_EDGES = [
  { from: 'c', to: 'a2', dur: 2.6, delay: 0.0, color: '#5eead4' },
  { from: 'a1', to: 'c', dur: 3.0, delay: 0.4, color: '#a78bfa' },
  { from: 'c', to: 'a4', dur: 2.4, delay: 0.9, color: '#5eead4' },
  { from: 'a3', to: 'b3', dur: 2.0, delay: 1.3, color: '#5eead4' },
  { from: 'c', to: 'a6', dur: 2.8, delay: 1.7, color: '#a78bfa' },
  { from: 'a5', to: 'b5', dur: 2.2, delay: 2.1, color: '#5eead4' },
  { from: 'c', to: 'ba', dur: 1.8, delay: 0.6, color: '#a78bfa' },
  { from: 'a2', to: 'b2', dur: 2.4, delay: 2.4, color: '#5eead4' },
] as const;

function Crosshair({ className = '' }: { className?: string }) {
  return (
    <div className={'absolute h-3 w-3 ' + className}>
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
      <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/30" />
    </div>
  );
}

function NetworkOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-8 rounded-full bg-[#5eead4]/10 blur-[80px]" />
      <div className="absolute inset-16 rounded-full bg-[#a78bfa]/15 blur-[60px]" />

      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <Crosshair className="left-3 top-3" />
        <Crosshair className="right-3 top-3" />
        <Crosshair className="bottom-3 left-3" />
        <Crosshair className="bottom-3 right-3" />

        <div className="absolute left-5 top-4 font-mono text-[10px] tracking-[0.18em] text-white/40">
          NEURAL TOPOLOGY · v0.4
        </div>
        <div className="absolute right-5 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-[#5eead4]/80">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5eead4] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
          </span>
          LIVE
        </div>
        <div className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.18em] text-white/35">
          NODES · 18 &nbsp;·&nbsp; EDGES · {EDGES.length}
        </div>
        <div className="absolute bottom-4 right-5 font-mono text-[10px] tracking-[0.18em] text-white/35">
          THROUGHPUT · 2.4&nbsp;TB/s
        </div>

        <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#5eead4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.g
            style={{ transformOrigin: '250px 250px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="250"
              cy="250"
              r="215"
              fill="none"
              stroke="rgba(94,234,212,0.12)"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
            <circle cx="465" cy="250" r="2" fill="#5eead4" />
            <circle cx="35" cy="250" r="2" fill="#a78bfa" />
          </motion.g>

          <motion.g
            style={{ transformOrigin: '250px 250px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="rgba(167,139,250,0.10)"
              strokeWidth="1"
            />
          </motion.g>

          {EDGES.map(([a, b], i) => {
            const A = byId[a];
            const B = byId[b];
            return (
              <motion.line
                key={i}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.4 + i * 0.02, ease: 'easeOut' }}
              />
            );
          })}

          {FLOW_EDGES.map((f, i) => {
            const A = byId[f.from];
            const B = byId[f.to];
            return (
              <motion.circle
                key={'p' + i}
                r="2.5"
                fill={f.color}
                filter="url(#softGlow)"
                initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                animate={{
                  cx: [A.x, B.x],
                  cy: [A.y, B.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: f.dur,
                  delay: f.delay,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  ease: 'easeInOut',
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            );
          })}

          {NODES.map((n, i) => {
            if (n.kind === 'core') {
              return (
                <g key={n.id}>
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={28}
                    fill="url(#coreGrad)"
                    animate={{ opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <circle cx={n.x} cy={n.y} r={n.r} fill="#ffffff" />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 2}
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                </g>
              );
            }
            if (n.kind === 'hub') {
              return (
                <g key={n.id}>
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={12}
                    fill="url(#hubGrad)"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 2.5 + (i % 3) * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.15,
                    }}
                  />
                  <circle cx={n.x} cy={n.y} r={n.r} fill="#5eead4" />
                </g>
              );
            }
            return (
              <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill="rgba(255,255,255,0.75)" />
            );
          })}
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#5eead4]/10" />
    </div>
  );
}

const rise = (delay = 0) =>
  ({
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease: EASE },
  }) as const;

function GridBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(94,234,212,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.7) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 85%)',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 85%)',
      }}
    />
  );
}

function GlowBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 -top-32 h-[640px] w-[640px] rounded-full bg-[#5eead4]/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-[560px] w-[560px] rounded-full bg-[#a78bfa]/[0.14] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#5eead4]/[0.05] blur-[120px]" />
    </>
  );
}

export function Hero() {
  const t = useTranslations('hero');

  const stats = [
    { Icon: Cpu, label: t('stats.narrative.label'), value: t('stats.narrative.value') },
    { Icon: Film, label: t('stats.video.label'), value: t('stats.video.value') },
    { Icon: Database, label: t('stats.data.label'), value: t('stats.data.value') },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05060a] text-white">
      <GridBg />
      <GlowBlobs />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05060a] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05060a] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-10 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-16">
        <div className="lg:col-span-7">
          <motion.div
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-[#5eead4]/20 bg-[#5eead4]/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-[0.22em] text-[#5eead4]/90"
          >
            <Sparkles size={12} className="opacity-80" />
            <span>// {t('eyebrow')}</span>
          </motion.div>

          <motion.h1
            {...rise(0.1)}
            className="mt-7 font-medium leading-[0.98] tracking-tight"
            style={{ fontSize: 'clamp(46px, 6.8vw, 92px)' }}
          >
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #ffffff 0%, #f4fdfb 25%, #5eead4 58%, #a78bfa 100%)',
              }}
            >
              {t('titleLine1')}
            </span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #ffffff 0%, #c7f3ea 30%, #5eead4 60%, #a78bfa 100%)',
              }}
            >
              {t('titleLine2')}
            </span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-7 max-w-[560px] text-[17px] leading-[1.6] text-white/55">
            {t.rich('subtitle', {
              em: (chunks) => <span className="text-white/85">{chunks}</span>,
            })}
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/products/narrative-engine"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#5eead4] px-6 py-3 text-[14px] font-medium text-[#05060a] transition-all hover:shadow-[0_0_40px_-5px_#5eead4]"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-[#5eead4] to-[#7df0dd] opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="relative">{t('ctaPrimary')}</span>
              <span className="relative transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-[14px] text-white/85 backdrop-blur-sm transition hover:border-[#a78bfa]/40 hover:bg-white/[0.05] hover:text-white"
            >
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-[#a78bfa]/60 bg-[#a78bfa]/10">
                <Play size={9} className="translate-x-[0.5px] text-[#a78bfa]" fill="currentColor" />
              </span>
              {t('ctaSecondary')}
              <span className="font-mono text-[11px] text-white/35">{t('ctaSecondaryDuration')}</span>
            </Link>
          </motion.div>

          <motion.div
            {...rise(0.4)}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[0.06] pt-6"
          >
            {stats.map(({ Icon, label, value }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-[#5eead4]/80">
                  <Icon size={16} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[13px] text-white/85">{label}</span>
                  <span className="font-mono text-[10px] tracking-wider text-white/35">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="lg:col-span-5"
        >
          <NetworkOrb />
        </motion.div>
      </div>

      <motion.div
        {...rise(0.6)}
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/35"
      >
        <span>{t('scrollHint')}</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
