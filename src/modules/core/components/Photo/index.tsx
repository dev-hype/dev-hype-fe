import Image from 'next/image'
import { chakra } from '@chakra-ui/react'

const Photo = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop),
})

export default Photo
