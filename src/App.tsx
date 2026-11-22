import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, ChevronDown, House, MessageCircle } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll } from 'motion/react'
import Hero from './components/Hero'
import PropertyGuide from './components/PropertyGuide'
import Services from './components/Services'
import { listingUrl, photoSource, profileUrl } from './content'

const questions = [
  {
    question: 'Нужно ли приезжать на показы?',
    answer: 'На показы приезжать не нужно, я проведу их сам. Если дойдём до сделки, отдельно обсудим, что можно сделать удалённо и где понадобится ваше участие.',
  },
  {
    question: 'Можно заказать только осмотр или показ?',
    answer: 'Да. Напишите, что именно нужно сделать. Согласуем эту задачу и её стоимость.',
  },
  {
    question: 'Как я узнаю, что происходит с объектом?',
    answer: 'Буду присылать фото и видео по ходу работы, а после показов — короткий отчёт. Все предложения покупателей по цене передам вам.',
  },
]

export default function App() {
  const heroContact = useRef<HTMLAnchorElement>(null)
  const finalContact = useRef<HTMLAnchorElement>(null)
  const [showMobileContact, setShowMobileContact] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !heroContact.current || !finalContact.current) return

    const buttons = [heroContact.current, finalContact.current]
    const visibleButtons = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= 0.5) visibleButtons.add(entry.target)
        else visibleButtons.delete(entry.target)
      }

      setShowMobileContact(visibleButtons.size === 0)
    }, { threshold: 0.5 })

    for (const button of buttons) observer.observe(button)
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {!reduceMotion && <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />}
      <a className="skip-link" href="#main">К содержанию</a>

      <header className="site-header" id="top">
        <div className="shell header-inner flex items-center justify-between">
          <a className="wordmark" href="#top" aria-label="Дмитрий, недвижимость в Чите. В начало страницы">
            <span className="brand-icon"><House size={22} strokeWidth={1.65} aria-hidden="true" /></span>
            <span className="brand-text"><strong>Дмитрий</strong><span>Недвижимость в Чите</span></span>
          </a>
          <nav className="desktop-nav hidden md:flex" aria-label="Навигация по странице">
            <a href="#services">Услуги</a>
            <a href="#about">Обо мне</a>
            <a href="#payment">Оплата</a>
          </nav>
          <a className="header-contact" href={profileUrl} aria-label="Профиль на Авито">
            Профиль<span className="header-contact-platform">&nbsp;на Авито</span>
          </a>
        </div>
      </header>

      <main id="main">
        <Hero contactRef={heroContact} />
        <PropertyGuide />
        <Services />

        <section id="about" className="shell about" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow"><span className="label-line" /> Обо мне</p>
            <h2 id="about-title">Мой опыт в Чите</h2>
            <p>Сам продавал гаражи и машиноместа в Чите. Знаю, о чём спрашивают покупатели и что стоит уточнить в кооперативе до показа.</p>
          </div>
          <div className="credentials">
            <dl className="experience">
              <div><dt>Организационная и коммерческая работа</dt><dd>34 <span>года</span></dd></div>
              <div><dt>Опыт в управлении недвижимостью</dt><dd>8 <span>лет</span></dd></div>
            </dl>
            <a className="profile-link" href={profileUrl}>
              <BadgeCheck size={19} aria-hidden="true" /> Отзывы и профиль на Авито
            </a>
          </div>
        </section>

        <section id="payment" className="payment" aria-labelledby="payment-title">
          <div className="shell payment-inner">
            <div>
              <p className="eyebrow"><span className="label-line" /> Условия работы</p>
              <h2 id="payment-title">Как договоримся об оплате</h2>
            </div>
            <div className="payment-copy">
              <p>Заранее запишем в договоре, что я делаю и сколько это стоит. Оплата поэтапная, за выполненные задачи.</p>
              <p>Можно договориться о фиксированной сумме или проценте от продажи. Цена зависит от объекта и объёма работы.</p>
              <a className="quiet-link" href={listingUrl}>Цена в объявлении от 1 800 ₽</a>
            </div>
          </div>
        </section>

        <section id="faq" className="shell faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Частые вопросы</h2>
          <div className="faq-list">
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}<ChevronDown size={20} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="shell contact-section" aria-labelledby="contact-title">
          <div className="contact">
            <div>
              <h2 id="contact-title">Расскажите, что продаёте</h2>
              <p>Напишите, какой у вас объект, где он находится и что нужно сделать в Чите.</p>
            </div>
            <a className="button button-primary" href={listingUrl} ref={finalContact}>
              <MessageCircle size={19} aria-hidden="true" /> Написать на Авито
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>Дмитрий · Чита, Забайкальский край</span>
          <span className="credit">
            Фото Читы: <a href={photoSource}>Вячеслав Бухаров</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
          </span>
        </div>
      </footer>

      <AnimatePresence>
        {showMobileContact && (
          <motion.div
            className="mobile-contact md:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <a className="button button-primary" href={listingUrl}>
              <MessageCircle size={19} aria-hidden="true" /> Написать на Авито
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
