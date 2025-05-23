import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Email&Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
        try {
          const res = await convex.query(api.user.login,{
            email: credentials?.email,
            password: credentials?.password,
          })
          if (res.success) {
            return res.user
          } else {
            throw new Error(res.message)
          }
        }catch (error) {
          console.error("Error during authorization:", error)
          throw new Error("Authorization failed")
        }
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.role = token.role
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        // GitHub ile giriş yapan kullanıcı sizin GitHub hesabınız mı kontrol edelim
        // İzin verilen GitHub kullanıcı adınızı veya e-posta adresinizi burada belirtin
        const allowedGithubUsername = process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_USERNAME; // Buraya kendi GitHub kullanıcı adınızı yazın
        const allowedGithubEmail = process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_MAIL; // Buraya kendi GitHub e-posta adresinizi yazın
        
        if (profile.login !== allowedGithubUsername && profile.email !== allowedGithubEmail) {
          console.log("Yetkisiz GitHub kullanıcısı erişim denemesi:", profile.login);
          return false; // Erişim reddedildi
        }
      }
      return true; // Diğer tüm giriş yöntemleri ve izin verilen GitHub kullanıcısı için giriş izni verildi
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/admin")) {
        return url
      }
      return baseUrl
    },
  },
  pages: {
    signIn: "/admin/login", // Custom sign-in page
    error: "/admin/login", // Error page
    verifyRequest: "/admin/login", // (used for check email message)
    newUser: null, // Will disable the new account creation screen
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }