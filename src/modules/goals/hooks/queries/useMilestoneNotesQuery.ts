// import { QueryFunction, useQuery } from 'react-query'

// import { getMilestoneNotes } from '../../api/notes'

// import { IMilestoneNotesResponse } from '../../types/res'

// export type MilestoneNotesQueryKey = [string, { milestoneId: number }]

// export const getMilestoneNotesQueryKey = (
//   milestoneId: number,
// ): MilestoneNotesQueryKey => ['/milestones/:id/notes', { milestoneId }]

// export const userQueryFn: QueryFunction<
//   IMilestoneNotesResponse,
//   MilestoneNotesQueryKey
// > = ({ queryKey }) => {
//   const [, { milestoneId }] = queryKey

//   return getMilestoneNotes(milestoneId)
// }

export const useMilestoneNotesQuery = (milestoneId?: number) => {
  console.log(milestoneId)
  //   const queryResult = useQuery<
  //     IMilestoneNotesResponse,
  //     unknown,
  //     IMilestoneNotesResponse,
  //     MilestoneNotesQueryKey
  //   >({
  //     queryFn: userQueryFn,
  //     queryKey: getMilestoneNotesQueryKey(milestoneId as number),
  //     enabled: typeof milestoneId === 'number',
  //   })
  //   return queryResult
}
