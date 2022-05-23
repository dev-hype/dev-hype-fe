import { WeekDay } from './entities'

export interface ICreateGoalDto {
  name: string
  startDate: string
  topicName: string
  specializationId: number
}

export interface ICreateResourceDto {
  name: string
  url: string
  isFree: boolean
  typeId: number
}

export interface ICreateMilestoneScheduleDto {
  weekDay: WeekDay
  durationInHours: number
}

export interface ICreateMilestoneDto {
  name: string
  startDate: string
  estimatedEndDate: string
  resource: ICreateResourceDto
  schedules: ICreateMilestoneScheduleDto[]
}
