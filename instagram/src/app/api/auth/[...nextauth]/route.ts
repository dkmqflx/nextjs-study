import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "@/service/user";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",

      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  // 추가적인 처리를 위해 callbacks을 작성한다
  callbacks: {
    // 로그인이 되었을 때 실행되는 함수
    async signIn({ user: { id, name, image, email } }) {
      // 이메일이 없는 사용자는 가입시키지 않는다. 잘못된 유저이기 때문
      // 물론 이메일이 없을 수는 없지만 타입적으로 optional 이기 때문에 조건문으로 처리해준다
      if (!email) {
        return false;
      }

      /**
       * 프론트에서 바로 Content Lake에 접근하는 것이 아니라
       * 백엔드에서 addUser라는 함수를 실행해서 Content Lake에 접근하도록 한다
       */

      addUser({
        id,
        name: name || "",
        image,
        email,
        username: email.split("@")[0],
      });
      return true;
    },

    // signIn이 실행된 다음에 실행된다
    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const user = session?.user;

      // 로그인한 유저가 있다면
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };

/**
 * Next.js는 풀스택 프레임워크로
 * 이렇게 Route handler 를 등록함으로써
 * 서버상에서 로그인에 관련된 다양한 API를 실행할 수 있게 된다
 */
