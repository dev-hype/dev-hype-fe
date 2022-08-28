import React from 'react'

import { TbBell, TbMessageCircle2 } from 'react-icons/tb'

import { useAuthModal } from 'src/modules/auth/hooks/useAuthModal'
import { useAuthContext } from 'src/modules/auth/providers/AuthProvider'
import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { corePaths } from '../../constants/paths'
import { removeAuthCookie_client } from 'src/modules/auth/utils/authCookie'
import Link from 'next/link'
import Image from 'next/image'

import Logo from 'public/images/logo.png'
import Button from '../Button'
import IconButton from '../IconButton'
import UserDropdown from './UserDropdown'
import Tooltip from '../Tooltip'

const PageHeader: React.FC = () => {
  const { openAuthModal } = useAuthModal()

  const { setLoggedInFlagOff } = useAuthContext()

  const { data: userData } = useAuthUserQuery()

  return (
    <header className="h-20 col-span-3 flex items-center justify-between px-9">
      <Link href={corePaths.home()}>
        <a className="leading-none">
          <Image
            src={Logo.src}
            alt="Dev Hype"
            width={50}
            height={50}
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
    </header>
  )
}

export default React.memo(PageHeader)
