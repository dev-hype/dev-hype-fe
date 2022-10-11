import SuggestedFollowsCard from '.'

export const Default = () => (
  <div className="w-[350px]">
    <SuggestedFollowsCard
      users={[
        {
          id: '1',
          email: 'example@asd.com',
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            country: {
              key: 'US',
              name: 'United States',
            },
            countryCode: 'US',
            id: '1',
            timezoneName: 'America/New_York',
            userId: '1',
            avatar: 'https://avatars.dicebear.com/api/adventurer/1.svg',
          },
        },
        {
          id: '2',
          email: 'example@asd.com',
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            country: {
              key: 'US',
              name: 'United States',
            },
            countryCode: 'US',
            id: '2',
            timezoneName: 'America/New_York',
            userId: '2',
            avatar: 'https://avatars.dicebear.com/api/adventurer/2.svg',
          },
        },
        {
          id: '3',
          email: 'example@asd.comexample@asd.comexample@asd.comexample@asd.com',
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            country: {
              key: 'US',
              name: 'United States',
            },
            countryCode: 'US',
            id: '3',
            timezoneName: 'America/New_York',
            userId: '3',
            avatar: 'https://avatars.dicebear.com/api/adventurer/3.svg',
          },
        },
      ]}
    />
  </div>
)
