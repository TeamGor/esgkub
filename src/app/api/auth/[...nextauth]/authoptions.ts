import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseAdmin } from "@/lib/supabase";
import * as argon2 from "argon2";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // 1. Check user exists
        const { data: user, error } = await supabaseAdmin
          .from('USERS')
          .select('*')
          .eq('entity_email', credentials.email)
          .single();

        if (error || !user) return null;

        // 2. Verify password
        const isValid = await argon2.verify(
          user.password,
          credentials.password
        );

        if (isValid) {
          return {
            id: user.id,
            name: user.entity_name,
            email: user.entity_email,
            username: user.entity_name,
          };
        }
        
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.companyName = user.company_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          username: token.username as string
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET
};

// Type declarations
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      username: string;
      companyName?: string | null;
    }
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    username: string;
    company_name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
  }
}