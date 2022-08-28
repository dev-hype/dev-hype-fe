import React, { ReactNode } from 'react'

import LeftSide from './LeftSide'
import PageHeader from '../PageHeader'
import RightSide from './RightSide'

interface IAppLayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<IAppLayoutProps> = (props) => {
  const { children } = props

  return (
    <>
      <PageHeader />

      <div className="gap-8 grid grid-cols-[2fr_4fr_2fr] p-9">
        <aside className="flex flex-col gap-5">
          <LeftSide />
        </aside>

        <main>{children}</main>

        <aside>
          <RightSide />
        </aside>
      </div>
    </>
  )
}

export default AppLayout
