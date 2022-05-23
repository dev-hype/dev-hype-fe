import { ReactNode } from 'react'
import { FaBullseye, FaFlagCheckered } from 'react-icons/fa'

import { GoalModalStep } from './types'

type GoalModalSteps = Record<
  GoalModalStep,
  {
    key: GoalModalStep
    title: string
    description: string
    icon: ReactNode
  }
>

export const goalModalSteps: GoalModalSteps = {
  [GoalModalStep.Goal]: {
    key: GoalModalStep.Goal,
    title: 'Goal Details',
    description: 'Enter basic info about your goal',
    icon: <FaBullseye />,
  },
  [GoalModalStep.Milestones]: {
    key: GoalModalStep.Milestones,
    title: 'Milestones',
    description: 'Break your goal into milestones',
    icon: <FaFlagCheckered />,
  },
}
