"use client"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

type Props = PropsWithChildren<{}>

export const theme = extendTheme({
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            borderWidth: "1px",
          },
          td: {
            borderWidth: "1px",
          },
        },
      },
    },
  },
})

export const Providers: FC<Props> = ({ children }) => <ChakraProvider theme={theme}>{children}</ChakraProvider>
