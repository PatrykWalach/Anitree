export const getItem = <T>(key: string, defaultValue?: T) => {
  const cache = localStorage.getItem(key)
  const stored = cache && JSON.parse(cache)

  return {
    ...defaultValue,
    ...stored,
  } as T
}
export const setItem = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify({ ...value }))
