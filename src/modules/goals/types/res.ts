import { IGoal, IMilestone, IProject, ITopic } from './entities'

export interface IUserGoalsResponse {
  count: number
  page: number
  limit: number
  goals: Array<
    IGoal & {
      milestones: IMilestone[]
      projects: IProject[]
      topic: ITopic
    }
  >
}
