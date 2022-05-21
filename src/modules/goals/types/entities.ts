export interface ITopic {
  id: number
  name: string
  specializationId: number
}

export interface IProject {
  id: number
  name: string
  description: string
  url: string
  createdAt: Date
  updatedAt: Date
  goalId: number
}

export interface IMilestone {
  id: number
  name: string
  startDate: Date
  durationInHours: number
  estimatedEndDate: Date
  actualEndDate: Date | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  goalId: number
  resourceId: number
}

export interface IGoal {
  id: number
  name: string
  startDate: Date
  estimatedEndDate: Date | null
  actualEndDate: Date | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  topicId: number
}
