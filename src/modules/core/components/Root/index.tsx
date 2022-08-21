import React from 'react'
import { ColorMode, useColorMode } from '../../hooks/useColorMode'

interface IRootProps {
  children: React.ReactNode
  initialColorMode?: ColorMode
}

const Root: React.FC<IRootProps> = (props) => {
  const { children, initialColorMode } = props

  const { colorMode } = useColorMode(initialColorMode)

  return (
    <div className={colorMode}>
      <div id="root">{children}</div>
    </div>
  )
}

export default Root
