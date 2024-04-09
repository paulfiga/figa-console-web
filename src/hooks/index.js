import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useUser(userId) {
  const { data, error, isLoading } = useSWR(`/api/users/${userId}`, fetcher)

  return {
    user: data,
    isLoading,
    isError: error
  }
}

export function useDataSource(userId) {
  const { data, error, isLoading } = useSWR(`/api/users/${userId}/datasources`, fetcher)

  return {
    dataSources: data,
    isLoading,
    isError: error
  }
}

export function useDataSourceMutate(userId) {

  async function updateUser(url, {arg}) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    })
  }

  const { trigger } = useSWRMutation(`/api/users/${userId}/datasources`, updateUser, {
    revalidate: true,
  });
  
  return {
    trigger: trigger,
  }
}