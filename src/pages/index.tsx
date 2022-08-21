import { dehydrate } from '@tanstack/react-query'
import type { NextPage } from 'next'

import { Container, Heading, Text } from '@chakra-ui/react'

import { FaHeart } from 'react-icons/fa'

import Button from 'src/modules/core/components/Button'
import AppLayout from 'src/modules/core/components/AppLayout'

import { hybridRoute } from 'src/modules/core/routes/hybridRoute'
import Avatar from 'src/modules/core/components/Avatar'
import { useAtom } from 'jotai'
import { colorModeAtom } from 'src/modules/core/hooks/useColorMode'

export const getServerSideProps = hybridRoute(async (ctx, queryClient) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const Home: NextPage = () => {
  const [, setColorMode] = useAtom(colorModeAtom)

  return (
    <AppLayout headerTitle="Home">
      <Container>
        <Heading>Home Again!!!!!!</Heading>
        <Heading>Test</Heading>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minima
          maxime totam in ad doloribus nesciunt perferendis, ex blanditiis nobis
          a hic sunt fugiat voluptates amet distinctio dignissimos facilis
          suscipit?
        </Text>

        <div className="m-3 flex flex-col items-start gap-2">
          <Button
            color="gold"
            size="small"
            variant="outlined"
            onPress={() => {
              setColorMode('light')
            }}
          >
            Hello
          </Button>

          <Button isDisabled color="gold" size="small">
            Hello
          </Button>

          <Button color="gold" size="small" variant="outlined">
            Hello
          </Button>

          <Button color="gold" size="small" variant="ghost">
            Hello
          </Button>
        </div>

        <div className="m-3 flex flex-col items-start gap-2">
          <Button startIcon={<FaHeart />} color="gold">
            Hello
          </Button>

          <Button startIcon={<FaHeart />} color="gold" variant="outlined">
            Hello
          </Button>

          <Button startIcon={<FaHeart />} color="gold" variant="ghost">
            Hello
          </Button>
        </div>

        <div className="m-3 flex flex-col items-start gap-2">
          <Button
            elementType="a"
            href="https://google.com"
            color="gold"
            size="large"
          >
            Hello
          </Button>

          <Button color="gold" size="large" variant="outlined">
            Hello
          </Button>

          <Button
            elementType="a"
            href="https://google.com"
            color="gold"
            size="large"
            variant="ghost"
          >
            Hello
          </Button>

          <Avatar src="" name="John Doe" size="large" />
          <Avatar size="large" />

          <Avatar
            src="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
            name="John Doe"
          />

          <Avatar
            src="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
            name="John Doe"
            size="small"
          />
        </div>
      </Container>
    </AppLayout>
  )
}

export default Home
