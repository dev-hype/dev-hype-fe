import Avatar from '.'

export const Small_Default = () => {
  return (
    <Avatar
      size="small"
      src="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
    />
  )
}
export const Small_WithNameOnly = () => {
  return <Avatar size="small" name="John Doe" />
}
export const Small_WithoutNameAndImage = () => {
  return <Avatar size="small" />
}

export const Medium_Default = () => {
  return <Avatar src="https://avatars.dicebear.com/api/adventurer/a8s7.svg" />
}
export const Medium_WithNameOnly = () => {
  return <Avatar name="John Doe" />
}
export const Medium_WithoutNameAndImage = () => {
  return <Avatar />
}

export const Large_Default = () => {
  return (
    <Avatar
      size="large"
      src="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
    />
  )
}

export const Large_WithNameOnly = () => {
  return <Avatar size="large" name="John Doe" />
}

export const Large_WithoutNameAndImage = () => {
  return <Avatar size="large" />
}
