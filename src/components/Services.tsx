import { useState } from 'react'
import { Camera, ChevronDown, FileText, KeyRound, ListChecks, MapPin, Newspaper } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { entrance, ease } from '../animation'
import cityPhoto from '../assets/chita.webp'

const services = [
  {
    icon: Camera,
    title: 'Осмотрю и сниму объект',
    description: 'Сделаю фотографии для объявления, а вам отправлю видео, чтобы вы видели, в каком состоянии объект.',
  },
  {
    icon: ListChecks,
    title: 'Подготовлю к продаже',
    description: 'Если нужно, организую уборку, вывоз вещей, мелкий ремонт или расчистку участка.',
  },
  {
    icon: Newspaper,
    title: 'Размещу объявление',
    description: 'Напишу текст, подберу фотографии, настрою продвижение и возьму на себя звонки и переписку.',
  },
  {
    icon: KeyRound,
    title: 'Проведу показы',
    description: 'Встречусь с покупателями. После показа расскажу, что им понравилось, о чём спрашивали и какую цену предложили.',
  },
  {
    icon: FileText,
    title: 'Помогу с документами',
    description: 'Сниму показания счётчиков, заберу квитанции и помогу собрать справки.',
  },
]

export default function Services() {
  const [open, setOpen] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <section id="services" className="process" aria-labelledby="services-title">
      <div className="shell process-inner">
        <motion.div
          className="process-intro"
          initial={reduceMotion ? false : { opacity: 0.65, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={entrance()}
        >
          <h2 id="services-title">Что я сделаю <span>на месте</span></h2>
          <p>Могу приехать только на осмотр или помочь с подготовкой, объявлением и показами.</p>
          <figure className="city-picture">
            <img src={cityPhoto} width="1280" height="598" alt="Чита с Титовской сопки" loading="lazy" />
            <figcaption><MapPin size={15} aria-hidden="true" /> Чита с Титовской сопки</figcaption>
          </figure>
        </motion.div>
        <div className="service-accordion">
          {services.map(({ title, description, icon: Icon }, index) => {
            const expanded = open === index

            return (
              <div key={title} className="service-row" data-expanded={expanded}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`service-details-${index}`}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                    <span>{title}</span>
                    <ChevronDown className="service-chevron" size={19} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`service-details-${index}`} aria-hidden={!expanded}>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        className="service-description"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
                      >
                        <p>{description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
