// import { NextApiHandler } from "next"
// import NextAuth, { AuthOptions } from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GitHubProvider from "next-auth/providers/github"
// import prisma from "@/lib/prisma"
//
// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)
//
// /**
//  * Configure NextAuth
//  */
// const authOptions: AuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.SECRET,
//   pages: {
//     signIn: "[subdomain]/login",
//   },
// }
//
// export default authHandler

import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const authResponse = await fetch("/users/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(credentials),
//         })
//
//         if (!authResponse.ok) {
//           return null
//         }
//
//         const user = await authResponse.json()
//
//         return user
//       },
//     }),
//   ],
// }
//
// export default NextAuth(options)
