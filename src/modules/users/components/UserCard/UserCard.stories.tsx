import UserCard from '.'

export const Default = () => (
  <div className="w-[350px]">
    <UserCard
      email="example@asd.com"
      bio="Dolor sit amet consectetur adipisicing elit. Sint fugit reprehenderit reiciendis."
      followers={100}
      following={1270}
      userImage="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
      userName="John Doe"
      profileLink="#"
    />
  </div>
)
