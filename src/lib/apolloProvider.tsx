'use client'

/** Dependency */
import { ApolloProvider } from "@apollo/client"

/** Component */
import client from "@/lib/apolloClient"

interface Props {
  children: React.ReactNode
}
const Provider = ({ children }: Props) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default Provider