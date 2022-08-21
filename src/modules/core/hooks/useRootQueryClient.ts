import { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'

export const useRootQueryClient = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { retry: false },
          queries: {
            staleTime: 2 * 60 * 1000,
          },
        },
      }),
  )

  return queryClient
}
