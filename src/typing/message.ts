export type IMessage =
    | {
          isMedia: boolean
          url?: string
          type: string | null
          content: string
      }
    | undefined
