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

export function useDataSource(userId, provider) {
  const { data, error, isLoading, mutate } = useSWR(`/api/users/${userId}/datasources/${provider}`, fetcher, {fallbackData:[]})

  return {
    dataSources: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useDocuments(userId) {
  const { data, error, isLoading, mutate } = useSWR(`/api/users/${userId}/documents/`, fetcher, {fallbackData:[]})

  return {
    documents: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useEmbedDataSource(userId, provider) {
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

  const { trigger } = useSWRMutation(`/api/users/${userId}/datasources/${provider}`, updateUser);
  
  return {
    trigger: trigger,
  }
}