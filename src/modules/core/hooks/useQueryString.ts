import qs from 'query-string'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

type QueryValue = string | number | null | (string | number | null)[]

export const useQueryString = () => {
  const { query, push, replace } = useRouter()

  const addToQS = useCallback(
    ({
      queryObject,
      pathname,
      isReplace,
    }: {
      queryObject: Record<string, QueryValue>
      pathname?: string
      isReplace?: boolean
    }) => {
      const routerMethod = isReplace ? replace : push

      routerMethod({
        pathname,
        search: qs.stringify(
          {
            ...query,
            ...queryObject,
          },
          {
            arrayFormat: 'bracket-separator',
            arrayFormatSeparator: '|',
            skipEmptyString: true,
            skipNull: true,
          },
        ),
      })
    },
    [push, replace, query],
  )

  const overrideQS = useCallback(
    ({
      queryObject,
      pathname,
      isReplace,
    }: {
      queryObject: Record<string, QueryValue>
      pathname?: string
      isReplace?: boolean
    }) => {
      const routerMethod = isReplace ? replace : push

      routerMethod({
        pathname,
        search: qs.stringify(
          {
            ...queryObject,
          },
          {
            arrayFormat: 'bracket-separator',
            arrayFormatSeparator: '|',
            skipEmptyString: true,
            skipNull: true,
          },
        ),
      })
    },
    [push, replace],
  )

  const removeFromQS = useCallback(
    ({ keys, isReplace }: { keys: string[]; isReplace?: boolean }) => {
      const routerMethod = isReplace ? replace : push

      const removalObj = keys.reduce(
        (base, key) => ({
          ...base,
          [key]: undefined,
        }),
        {},
      )

      routerMethod({
        search: qs.stringify(
          {
            ...query,
            ...removalObj,
          },
          {
            arrayFormat: 'bracket-separator',
            arrayFormatSeparator: '|',
            skipEmptyString: true,
            skipNull: true,
          },
        ),
      })
    },
    [push, replace, query],
  )

  const clearQS = useCallback(
    ({ isReplace }: { isReplace?: boolean }) => {
      const routerMethod = isReplace ? replace : push

      routerMethod({
        search: '',
      })
    },
    [push, replace],
  )

  return {
    query,
    addToQS,
    overrideQS,
    removeFromQS,
    clearQS,
  }
}
