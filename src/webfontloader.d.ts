declare module 'webfontloader' {
  type WebFontConfig = {
    loading?(): void
    active?(): void
    inactive?(): void
    fontloading?(familyName: string, fvd: string): void
    fontactive?(familyName: string, fvd: string): void
    fontinactive?(familyName: string, fvd: string): void
    classes?: boolean
    events?: boolean
    timeout?: number
    context?: Window

    custom?: {
      families: string[]
      urls?: string[]
      testStrings?: Record<string, string>
    }

    google?: {
      families: string[]
      text?: string
    }

    typekit?: {
      id: string
      api?: string
    }

    fontdeck?: {
      id: string
    }

    monotype?: {
      projectId: string
      version?: number
      loadAllFonts?: number
    }
  }

  interface WebFont {
    load(WebFontConfig: WebFontConfig): void
  }

  const WebFont: WebFont
  export default WebFont
}
