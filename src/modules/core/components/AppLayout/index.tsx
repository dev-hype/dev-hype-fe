import React, { ReactNode } from 'react'
import PageHeader from '../PageHeader'
import Paper from '../Paper'
import LeftSide from './LeftSide'

interface IAppLayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<IAppLayoutProps> = (props) => {
  const { children } = props

  return (
    <>
      <PageHeader />

      <div className="gap-8 grid grid-cols-[2fr_4fr_3fr] p-9">
        <aside>
          <LeftSide />
        </aside>

        <main>{children}</main>

        <aside>
          <Paper>Hello</Paper>
        </aside>
      </div>
    </>
  )
}

export default AppLayout
