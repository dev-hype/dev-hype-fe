import React from 'react'

import { Box, Container, Tab, TabList, Tabs } from '@chakra-ui/react'
import { FaBullseye, FaChartPie, FaTasks } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { GoPulse } from 'react-icons/go'

export enum ProfileTab {
  Goals = 'Goals',
  Tasks = 'Tasks',
  Timeline = 'Timeline',
  Stats = 'Stats',
  Activity = 'Activity',
}

const tabs = [
  {
    label: 'Goals',
    value: ProfileTab.Goals,
    icon: <FaBullseye />,
  },
  {
    label: 'Tasks',
    value: ProfileTab.Tasks,
    icon: <FaTasks />,
  },
  {
    label: 'Timeline',
    value: ProfileTab.Timeline,
    icon: <GiProgression />,
  },
  {
    label: 'Stats',
    value: ProfileTab.Stats,
    icon: <FaChartPie />,
  },
  {
    label: 'Activity',
    value: ProfileTab.Activity,
    icon: <GoPulse size={19} />,
  },
]

interface IProfileTabsProps {
  selectedTab: ProfileTab
  onChange: (tab: ProfileTab) => void
}

const ProfileTabs: React.FC<IProfileTabsProps> = (props) => {
  const { selectedTab, onChange } = props

  return (
    <Tabs
      variant="unstyled"
      colorScheme="brand"
      onChange={(index) => {
        onChange(Object.values(ProfileTab)[index])
      }}
    >
      <TabList>
        <Container maxW="container.lg" display="flex">
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              color="gray.500"
              value={tab.value}
              fontSize="sm"
              isSelected={selectedTab === tab.value}
              _selected={{
                color: 'brand.500',
                fontWeight: 'bold',
                borderBottom: '1px solid',
              }}
            >
              <Box mr="1.5">{tab.icon}</Box>

              {tab.label}
            </Tab>
          ))}
        </Container>
      </TabList>
    </Tabs>
  )
}

export default ProfileTabs
