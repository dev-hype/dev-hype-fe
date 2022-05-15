import { MouseEvent, useCallback, useState } from 'react'

export const usePopupState = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isOpen = Boolean(anchorEl)

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return {
    anchorEl,
    isOpen,
    handleOpen,
    handleClose,
  }
}
