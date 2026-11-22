import { useRef, useState, type KeyboardEvent } from 'react'
import { Building2, CarFront, House } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ease } from '../animation'
import { listingUrl } from '../content'
import OrbitGlyph, { type PropertyKind } from './OrbitGlyph'

const properties = [
  {
    id: 'home',
    title: 'Квартира или дом',
    tab: 'Квартира или дом',
    icon: Building2,
    intro: 'Напишите район, площадь и состояние жилья. Если оно пустует, скажите, у кого сейчас ключи.',
  },
  {
    id: 'dacha',
    title: 'Дача',
    tab: 'Дача',
    icon: House,
    intro: 'Напишите, в каком СНТ или посёлке находится дача, что есть на участке и можно ли туда подъехать.',
  },
  {
    id: 'garage',
    title: 'Гараж или машиноместо',
    tab: 'Гараж или место',
    icon: CarFront,
    intro: 'Напишите район или название кооператива, размеры и оформлен ли объект в собственность.',
  },
] as const satisfies ReadonlyArray<{ id: PropertyKind; title: string; tab: string; icon: typeof House; intro: string }>

export default function PropertyGuide() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduceMotion = useReducedMotion()
  const property = properties[active]

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = properties.length - 1
    const next = {
      ArrowLeft: (index + last) % properties.length,
      ArrowRight: (index + 1) % properties.length,
      Home: 0,
      End: last,
    }[event.key]

    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section className="property-section" aria-labelledby="property-title">
      <div className="shell property-inner">
        <h2 id="property-title">Что вы продаёте?</h2>

        <div className="property-guide">
          <div className="property-tabs" role="tablist" aria-label="Вид недвижимости">
            {properties.map(({ id, tab, icon: Icon }, index) => (
              <button
                key={id}
                ref={(element) => { tabs.current[index] = element }}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="property-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                {active === index && (
                  <motion.span
                    className="property-highlight"
                    layoutId={reduceMotion ? undefined : 'property-tab'}
                    transition={{ type: 'spring', stiffness: 440, damping: 38 }}
                  />
                )}
                <Icon size={20} strokeWidth={1.65} aria-hidden="true" />
                <span>{tab}</span>
              </button>
            ))}
          </div>

          <div id="property-panel" className="property-panel" role="tabpanel" aria-labelledby={`tab-${property.id}`} tabIndex={0}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={property.id}
                className="property-panel-content"
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease }}
              >
                <div>
                  <h3>{property.title}</h3>
                  <p>{property.intro}</p>
                </div>
                <OrbitGlyph kind={property.id} />
              </motion.div>
            </AnimatePresence>
            <a className="quiet-link" href={listingUrl}>Обсудить на Авито</a>
          </div>
        </div>
      </div>
    </section>
  )
}
