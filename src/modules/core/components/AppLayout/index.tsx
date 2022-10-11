import React, { ReactNode } from 'react'
import clsx from 'clsx'

import LeftSide from './LeftSide'
import PageHeader from '../PageHeader'
import RightSide from './RightSide'
import Side from './Side'
import MobileNav from '../MobileNav'

interface IAppLayoutProps {
  children: ReactNode
  pageTitle: string
  backUrl?: string
}

const AppLayout: React.FC<IAppLayoutProps> = props => {
  const { children, pageTitle, backUrl } = props

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageHeader title={pageTitle} backUrl={backUrl} />

      <div
        className={clsx(
          'gap-5',
          'grid',
          'grid-cols-1',
          'lg:grid-cols-[minmax(300px,_2fr)_minmax(500px,_4fr)]',
          'xl:grid-cols-[minmax(300px,_2fr)_minmax(500px,_4fr)_minmax(300px,_2fr)]',
          'items-start',
          'p-2',
          'sm:p-4',
          'md:p-9',
          'pt-4',
          'pb-20',
          'lg:pb-0',
        )}
      >
        <Side className="hidden lg:flex">
          <LeftSide />
        </Side>

        <main>{children}</main>

        <Side className="hidden xl:flex">
          <RightSide />
        </Side>
      </div>

      <MobileNav />
    </div>
  )
}

export default AppLayout
