export const useIntl = () => {
  const { format: formatNumber } = new Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    notation: 'compact',
  } as Intl.NumberFormatOptions)

  return { formatNumber }
}
