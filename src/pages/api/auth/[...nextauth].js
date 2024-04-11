import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"

const SCOPES = 'https://www.googleapis.com/auth/drive.readonly openid email profile';

// const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // this to force refresh token
      // https://next-auth.js.org/providers/google#example
      authorization: {
        params: {
          scope: SCOPES,
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // "jwt" this is the key to make adapter work! https://github.com/nextauthjs/next-auth/issues/7535
  },
  // ...add more providers here
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.id = profile.id
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.userId = token.sub;
      return session
    }
  },
}

export default NextAuth(authOptions)