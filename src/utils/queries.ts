export const addQueryParams = (url: string, params: Record<string, string | number>): string => {
  const urlObj = new URL(url)
  Object.keys(params).forEach((key) => urlObj.searchParams.append(key, params[key].toString()))
  return urlObj.toString()
}
