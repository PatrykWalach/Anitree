export const getItem = <T extends Object>(key: string, defaultValue?: T) => {
  const cache = localStorage.getItem(key)
  const stored = cache && JSON.parse(cache)

  return {
    ...defaultValue,
    ...stored,
  } as T
}
export const setItem = <T extends Object>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify({ ...value }))
