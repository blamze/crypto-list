import { ref } from 'vue'
import type { Ref } from 'vue'
import { addQueryParams } from '@/utils/queries.ts'

interface RequestInitWithQuery extends RequestInit {
  query?: Record<string, string | number>
}

export function useFetch<T>() {
  const data: Ref<T | null> = ref(null)
  const error: Ref<string | null> = ref(null)
  const loading: Ref<boolean> = ref(false)

  const fetchData = async (url: string, options: RequestInitWithQuery = {}): Promise<T | null> => {
    loading.value = true
    error.value = null
    const fullUrl = options.query ? addQueryParams(url, options.query) : url
    try {
      const response = await fetch(fullUrl, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      data.value = (await response.json()) as T
    } catch (err) {
      error.value = (err as Error).message || 'Unknown error'
    } finally {
      loading.value = false
    }
    return data.value
  }

  return {
    data,
    error,
    loading,
    fetchData,
  }
}
