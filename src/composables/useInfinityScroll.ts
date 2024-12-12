import { ref, onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll<T>(
  fetchData: () => Promise<T[]>,
  options: { threshold?: number } = {},
) {
  const data = ref<T[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const threshold = options.threshold || 300

  const loadMore = async () => {
    if (loading.value) return
    loading.value = true
    error.value = null

    try {
      const newData = await fetchData()
      data.value = [...data.value, ...newData] as T[]
    } catch (err) {
      error.value = (err as Error).message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
      loadMore()
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
    loadMore()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    data,
    loading,
    error,
    loadMore,
  }
}
