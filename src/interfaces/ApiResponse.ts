export interface ApiResponse<T> {
  data: T
  status: ResponseMeta
}

export interface ResponseMeta {
  timestamp: string
  error_code: number
  error_message: string | null
  elapsed: number
  credit_count: number
  notice: string | null
  total_count: number
}
