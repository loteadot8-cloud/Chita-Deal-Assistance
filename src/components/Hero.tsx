import type { PointerEvent, RefObject } from 'react'
import { useRef } from 'react'
import { BadgeCheck, Camera, FileCheck2, MapPin, MessageCircle, Star } from 'lucide-react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { entrance } from '../animation'
import { listingUrl, maxUrl, profileUrl, telegramUrl, visitsStart } from '../content'
import portrait from '../assets/dmitry.webp'
import portraitSmall from '../assets/dmitry-small.webp'
import maxLogo from '../assets/max.webp'
import telegramLogo from '../assets/telegram.svg'
import OrbitGlyph from './OrbitGlyph'

export default function Hero({ contactRef }: { contactRef: RefObject<HTMLAnchorElement | null> }) {
  const artworkRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: artworkRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -8])
  const lightX = useSpring(14, { stiffness: 125, damping: 24 })
  const lightY = useSpring(11, { stiffness: 125, damping: 24 })
  const light = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, #a2e5db55, transparent 66%)`

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    lightX.set(100 * (event.clientX - bounds.left) / bounds.width)
    lightY.set(100 * (event.clientY - bounds.top) / bounds.height)
  }

  function appear(delay: number) {
    return {
      initial: reduceMotion ? false as const : { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: entrance(delay),
    }
  }

  return (
    <section className="shell hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.p className="eyebrow" {...appear(0.03)}>
          <MapPin size={16} aria-hidden="true" /> Чита и пригород
        </motion.p>
        <h1 id="hero-title">
          <motion.span {...appear(0.11)}>Помогу продать</motion.span>
          <motion.span {...appear(0.20)}>недвижимость</motion.span>
          <motion.span className="hero-accent" {...appear(0.29)}>в Чите</motion.span>
        </h1>
        <motion.p className="hero-description" {...appear(0.38)}>
          Живёте в другом городе? Я осмотрю объект, подготовлю его к продаже и проведу показы.
          Все предложения покупателей передам вам.
        </motion.p>
        <motion.div className="hero-actions flex flex-wrap items-center" {...appear(0.46)}>
          <a className="button button-primary" href={listingUrl} ref={contactRef}>
            <MessageCircle size={19} aria-hidden="true" /> Написать на Авито
          </a>
          <a className="quiet-link" href="#services">Чем помогу</a>
        </motion.div>
        {Date.now() < visitsStart && (
          <motion.p className="visit-note" {...appear(0.53)}>
            Выезды и очные показы в полном объёме с <time dateTime="2026-12-17">17 декабря</time>.
            Написать можно уже сейчас.
          </motion.p>
        )}
      </div>

      <motion.div className="hero-glyph" {...appear(0.3)}>
        <OrbitGlyph featured />
      </motion.div>
      <motion.div
        className="hero-visual"
        ref={artworkRef}
        onPointerMove={followPointer}
        onPointerLeave={() => { lightX.set(14); lightY.set(11) }}
        {...appear(0.21)}
      >
        <motion.span className="portrait-light" style={{ background: light }} aria-hidden="true" />
        <motion.figure className="hero-media" style={reduceMotion ? undefined : { y: portraitY }}>
          <img
            src={portrait}
            srcSet={`${portraitSmall} 600w, ${portrait} 963w`}
            sizes="(max-width: 767px) min(258px, 82vw), min(344px, 32vw)"
            width="963"
            height="1280"
            alt="Дмитрий"
            fetchPriority="high"
          />
        </motion.figure>
        <div className="portrait-caption">
          <div><strong>Дмитрий</strong><span>Представитель собственников в Чите</span></div>
          <a href={profileUrl} aria-label="Профиль Дмитрия на Авито, рейтинг 4,8">
            <Star size={15} aria-hidden="true" /> 4,8 на Авито
          </a>
        </div>
        <div className="portrait-messengers" role="group" aria-label="Связь в мессенджерах">
          <a href={telegramUrl} aria-label="Написать в Telegram">
            <img src={telegramLogo} width="24" height="24" alt="" />
            Telegram
          </a>
          <a href={maxUrl} aria-label="Написать в MAX">
            <img src={maxLogo} width="24" height="24" alt="" />
            MAX
          </a>
        </div>
      </motion.div>

      <ul className="hero-facts" aria-label="Условия работы">
        <li><FileCheck2 size={18} aria-hidden="true" /> Договор до начала работ</li>
        <li><Camera size={18} aria-hidden="true" /> Отчёт после каждого показа</li>
        <li><BadgeCheck size={18} aria-hidden="true" /> Поэтапная оплата</li>
      </ul>
    </section>
  )
}
