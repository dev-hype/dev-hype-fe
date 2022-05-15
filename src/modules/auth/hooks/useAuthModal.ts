import { useCallback } from 'react'

import { useQueryString } from 'src/modules/core/hooks/useQueryString'

export const useAuthModal = () => {
  const { query, addToQS, removeFromQS } = useQueryString()

  const isAuthModalOpen = query.auth === 'on'

  const openAuthModal = useCallback(() => {
    addToQS({ queryObject: { auth: 'on' } })
  }, [addToQS])

  const closeAuthModal = useCallback(() => {
    removeFromQS({ keys: ['auth'] })
  }, [removeFromQS])

  return {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  }
}
