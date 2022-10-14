import React from 'react'
import clsx from 'clsx'

import { TbArrowNarrowLeft, TbBell, TbMessageCircle2 } from 'react-icons/tb'

// import { useAuthModal } from 'src/modules/auth/hooks/useAuthModal'
// import { useAuthContext } from 'src/modules/auth/providers/AuthProvider'
// import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { corePaths } from '../../constants/paths'
import Link from 'next/link'
import Image from 'next/image'

import Logo from 'public/images/logo.png'
import IconButton from '../IconButton'
import UserDropdown from './UserDropdown'
import Tooltip from '../Tooltip'

interface IPageHeaderProps {
  title: string
  backUrl?: string
}

const PageHeader: React.FC<IPageHeaderProps> = props => {
  const { backUrl, title } = props

  return (
    <header
      className={clsx([
        'h-16',
        'col-span-3',
        'px-8',
        'sm:px-9',
        'sticky',
        'top-0',
        'z-appBar',
        'bg-white/70',
        'dark:bg-black/70',
        'backdrop-blur',
      ])}
    >
      <div className="hidden lg:flex items-center justify-between h-full">
        <Link href={corePaths.home()}>
          <a className="leading-none">
            <Image
              src={Logo.src}
              alt="Dev Hype"
              width={120}
              height={40}
              objectFit="contain"
              objectPosition="center"
            />
          </a>
        </Link>

        <div className="flex items-center">
          <Tooltip title="Messages">
            <IconButton variant="ghost" color="gray" className="mr-2">
              <TbMessageCircle2 size={24} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton variant="ghost" color="gray" className="mr-6">
              <TbBell size={24} />
            </IconButton>
          </Tooltip>

          <UserDropdown />
        </div>
      </div>

      <div className="flex items-center h-full lg:hidden">
        {backUrl ? (
          <Link href={backUrl} passHref>
            <IconButton as="a">
              <TbArrowNarrowLeft />
            </IconButton>
          </Link>
        ) : null}

        <h1 className="text-md font-bold">{title}</h1>
      </div>
    </header>
  )
}

export default React.memo(PageHeader)
