import React from 'react'

import 'tailwindcss/tailwind.css'

import type { GlobalProvider } from '@ladle/react'

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <div className={globalState.theme}>{children}</div>
)
