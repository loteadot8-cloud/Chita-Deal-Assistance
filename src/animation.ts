import type { Transition } from 'motion/react'

export const ease = [0.16, 1, 0.3, 1] as const

export function entrance(delay = 0): Transition {
  return { duration: 0.7, delay, ease }
}
