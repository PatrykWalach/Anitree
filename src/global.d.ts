import { ShareData } from './types'

declare global {
  interface Navigator {
    share?(this: Navigator, data: ShareData): Promise<void>
  }

  namespace Intl {
    interface DateTimeFormat {
      formatRange(startDate: Date | number, endDate: Date | number): string
      formatRangeToParts(
        startDate: Date | number,
        endDate: Date | number,
      ): DateTimeFormatPart[]
    }

    var RelativeTimeFormat: {
      new (
        locales?: string | string[],
        options?: RelativeTimeFormatOptions,
      ): RelativeTimeFormat
      (
        locales?: string | string[],
        options?: RelativeTimeFormatOptions,
      ): RelativeTimeFormat
    }
    interface RelativeTimeFormatOptions {
      localeMatcher?: 'lookup' | 'best fit'
      numeric?: 'always' | 'auto'
      style?: 'long' | 'short' | 'narrow'
    }
    interface RelativeTimeFormat {
      format(
        value: number,
        unit:
          | 'quarter'
          | 'month'
          | 'week'
          | 'day'
          | 'hour'
          | 'minute'
          | 'second',
      ): string
      formatToParts(
        value: number,
        unit:
          | 'quarter'
          | 'month'
          | 'week'
          | 'day'
          | 'hour'
          | 'minute'
          | 'second',
      ): DateTimeFormatPart[]
    }
  }
}
