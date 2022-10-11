import React from 'react'

import { FaUserGraduate } from 'react-icons/fa'
import { TbBell, TbHome, TbMessageCircle2, TbSettings } from 'react-icons/tb'

import { corePaths } from '../../constants/paths'
import { usersPaths } from 'src/modules/users/constants/paths'

import BottomNav, { BottomNavItem } from '../BottomNav'

const items: BottomNavItem[] = [
  {
    icon: <TbHome size={26} />,
    label: 'Home',
    url: corePaths.home(),
  },
  {
    icon: <FaUserGraduate size={24} />,
    label: 'Profile',
    url: usersPaths.profile(''),
  },
  {
    icon: <TbMessageCircle2 size={26} />,
    label: 'Messages',
    url: '',
  },
  {
    icon: <TbBell size={26} />,
    label: 'Notifications',
    url: '',
  },
  {
    icon: <TbSettings size={26} />,
    label: 'Settings',
    url: '',
  },
]

const MobileNav: React.FC = () => {
  return <BottomNav className="lg:hidden" items={items} />
}

export default MobileNav
