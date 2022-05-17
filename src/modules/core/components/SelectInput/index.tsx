import React from 'react'
import Select, { StylesConfig, ThemeConfig, Props } from 'react-select'

import { theme } from '../../config/theme'

export const reactSelectStylesConfig: StylesConfig = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: theme.colors.brand[400],
  }),
  control: (base) => ({
    ...base,
    height: 40,
    borderRadius: 3,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 16px',
  }),
}

export const reactSelectThemeConfig: ThemeConfig = (rsTheme) => ({
  ...rsTheme,
  colors: {
    ...rsTheme.colors,
    primary: theme.colors.brand[400],
    primary25: theme.colors.brand[100],
    primary50: theme.colors.brand[200],
    primary75: theme.colors.brand[300],
  },
})

const SelectInput: React.FC<Props> = (props) => {
  return (
    <Select
      theme={reactSelectThemeConfig}
      styles={reactSelectStylesConfig}
      {...props}
    />
  )
}

export default SelectInput
