import { useId, useRef } from 'react'
import { useInView } from 'motion/react'

export type PropertyKind = 'home' | 'dacha' | 'garage'

const symbols = {
  home: {
    roof: 'M39 56 63 42 88 56 64 71Z',
    front: 'M39 56 64 71 64 95 39 80Z',
    side: 'M64 71 88 56 88 80 64 95Z',
    detail: 'M55 73v9m-8-14v9m25 0v9m7-13v9m-7-18v4m7-9v4',
  },
  dacha: {
    roof: 'M33 67 54 42 73 53 92 66 71 79Z',
    front: 'M40 64 54 49 72 77 72 96 40 78Z',
    side: 'M72 77 87 68 87 86 72 96Z',
    detail: 'M50 63v9l7 4v-9zm11 15v11m17-8v6',
  },
  garage: {
    roof: 'M35 58 62 43 91 59 64 74Z',
    front: 'M35 58 64 74 64 94 35 79Z',
    side: 'M64 74 91 59 91 79 64 94Z',
    detail: 'M42 68l15 8m-15-3 15 8m-15-3 15 8m16-7 10-6',
  },
} satisfies Record<PropertyKind, { roof: string; front: string; side: string; detail: string }>

export default function OrbitGlyph({ kind = 'home', featured = false }: { kind?: PropertyKind; featured?: boolean }) {
  const gradient = useId()
  const ref = useRef<SVGSVGElement>(null)
  const visible = useInView(ref, { amount: 0.2 })
  const symbol = symbols[kind]

  return (
    <svg
      ref={ref}
      className="orbit-glyph"
      data-featured={featured}
      data-visible={visible}
      viewBox="0 0 128 128"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gradient}>
          <stop stopColor="#41787a" />
          <stop offset="1" stopColor="#172e40" />
        </radialGradient>
      </defs>

      <circle cx="64" cy="64" r="62" fill={`url(#${gradient})`} />
      <circle cx="64" cy="64" r="61.5" fill="none" stroke="#d7f9ed" strokeOpacity=".35" />
      <g className="glyph-tracer" fill="none">
        <circle cx="64" cy="64" r="53" stroke="#b6dfd7" strokeOpacity=".3" strokeDasharray="2 4" />
        <path d="M20 34a53 53 0 0 1 34-22" stroke="#b8f3df" strokeWidth="2" strokeLinecap="round" />
        <circle cx="54" cy="12" r="3" fill="#e2ffef" />
      </g>
      <ellipse cx="64" cy="68" rx="52" ry="22" transform="rotate(-26 64 68)" fill="none" stroke="#b8f3df" strokeOpacity=".5" />

      <g className="glyph-building" stroke="#e1f8f1" strokeWidth="1.2" strokeLinejoin="round">
        <path d={symbol.front} fill="#447d80" />
        <path d={symbol.side} fill="#275052" />
        <path d={symbol.roof} fill="#a4ddd3" />
        <path d={symbol.detail} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
