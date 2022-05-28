import {
  IGoal,
  IMilestone,
  IMilestoneSchedule,
  IProject,
  IResource,
  ISpecialization,
  ITopic,
} from './entities'

export interface IUserGoalsResponse {
  count: number
  page: number
  limit: number
  goals: Array<
    IGoal & {
      milestones: Array<
        IMilestone & {
          resource: IResource
          milestoneSchedules: IMilestoneSchedule[]
        }
      >
      projects: IProject[]
      topic: ITopic & {
        specialization: ISpecialization
      }
    }
  >
}

export interface ISingleGoalResponse {
  goal: IGoal & {
    milestones: Array<
      IMilestone & {
        resource: IResource
        milestoneSchedules: IMilestoneSchedule[]
      }
    >
    projects: IProject[]
    topic: ITopic & {
      specialization: ISpecialization
    }
  }
}

export interface ISpecializationsResponse {
  specializations: ISpecialization[]
}

export interface ITodayTasksResponse {
  milestones: Array<
    IMilestone & {
      milestoneSchedules: IMilestoneSchedule[]
      resource: IResource
    }
  >
}
