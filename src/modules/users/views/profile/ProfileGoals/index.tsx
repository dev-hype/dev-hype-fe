import React from 'react'

import { Container } from '@chakra-ui/react'

import GoalWidget from 'src/modules/goals/components/GoalWidget'

const ProfileGoals: React.FC = () => {
  return (
    <Container maxW="container.lg" p="6">
      <GoalWidget />
    </Container>
  )
}

export default ProfileGoals
