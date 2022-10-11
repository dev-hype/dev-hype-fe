import React from 'react'

interface INewSessionProps {
  milestoneId: number
  milestoneName: string
  resourceName: string
  notes: any[]
}

const NewSession: React.FC<INewSessionProps> = props => {
  const { milestoneId, milestoneName, resourceName, notes } = props

  return (
    <div>
      <div>{milestoneId}</div>
      <div>{milestoneName}</div>

      <div>{resourceName}</div>
      <div>{notes.map(note => note.note)}</div>
    </div>
  )
}

export default NewSession
