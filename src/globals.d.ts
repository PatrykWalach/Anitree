import { ShareData } from './types'

declare global {
  interface Navigator {
    share?: (data: ShareData) => Promise<void>
  }

  namespace Intl {
    interface DateTimeFormat {
      formatRange(startDate: Date | number, endDate: Date | number): string
      formatRangeToParts(
        startDate: Date | number,
        endDate: Date | number,
      ): DateTimeFormatPart[]
    }
  }
}
