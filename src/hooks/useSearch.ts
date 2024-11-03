import { searchUsers } from "@/actions/user"
import { useQueryComponennt } from "@/hooks/useQuery"
import { useEffect, useState } from "react"

export const useSearch = (key : string , type :  'USERS') => {

    const [query, setQuery] = useState('')
    const [debounce, setDebounce] = useState('')
    const [onUsers, setOnUsers] = useState<
      | {
          id: string
          subscription: {
            plan: 'PRO' | 'FREE'
          } | null
          firstname: string | null
          lastname: string | null
          image: string | null
          email: string | null
        }[]
      | undefined
    >(undefined)

    const onSearchQuery = (e : React.ChangeEvent<HTMLInputElement>) => {
           setQuery(e.target.value);
    }

    useEffect(() => {
        const delayInputOutPut = setTimeout(() => {
            setQuery(query)
        },1000)

        return () => clearTimeout(delayInputOutPut)
    },[query])

    const { refetch, isFetching } = useQueryComponennt(
        [key, debounce],
        async ({ queryKey }) => {
          if (type === 'USERS') {
            const users = await searchUsers(queryKey[1] as string)
            if (users.status === 200) setOnUsers(users.data)
          }
        },
        false
      )

      useEffect(() => {
        if (debounce) refetch()
        if (!debounce) setOnUsers(undefined)
        return () => {
          debounce
        }
      }, [debounce])

      return { onSearchQuery, query, isFetching, onUsers }
}