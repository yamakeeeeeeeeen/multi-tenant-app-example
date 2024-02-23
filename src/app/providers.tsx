"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

type Props = PropsWithChildren<{}>

export const Providers: FC<Props> = ({ children }) => <ChakraProvider>{children}</ChakraProvider>
