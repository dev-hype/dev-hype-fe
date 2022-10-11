import React from 'react'
import { TbLogin } from 'react-icons/tb'

import Button from 'src/modules/core/components/Button'
import Paper from 'src/modules/core/components/Paper'

interface IAuthCardProps {
  openAuthModal: () => void
}

const AuthCard: React.FC<IAuthCardProps> = props => {
  const { openAuthModal } = props

  return (
    <Paper className="flex flex-col items-center">
      <p className="mb-5 text-center">
        <span className="text-gold font-bold">DevHype</span> helps you connect
        and share your learning goals with other learners and experts...
      </p>

      <Button
        onClick={openAuthModal}
        variant="ghost"
        startIcon={<TbLogin size={20} />}
      >
        Login/Signup
      </Button>
    </Paper>
  )
}

export default AuthCard
