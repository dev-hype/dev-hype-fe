import TrendsCard from '.'

export const Default = () => (
  <div className="w-[450px]">
    <TrendsCard
      specializations={[
        {
          id: 1,
          name: 'Web Development',
          topics: [
            {
              id: 1,
              name: 'React.js',
              goalsCount: 10,
            },
            {
              id: 2,
              name: 'Vue.js',
              goalsCount: 12,
            },
            {
              id: 3,
              name: 'Angular.js',
              goalsCount: 8,
            },
            {
              id: 4,
              name: 'Node.js',
              goalsCount: 14,
            },
          ],
        },
      ]}
    />
  </div>
)
