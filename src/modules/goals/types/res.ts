import { IGoal, IMilestone, IProject, ITopic } from './entities'

export interface IUserGoalsResponse {
  goals: Array<
    IGoal & {
      milestones: IMilestone[]
      projects: IProject[]
      topic: ITopic
    }
  >
}
