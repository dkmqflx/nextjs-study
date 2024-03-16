import { User } from "@/model/user";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

/**
 * Session의 user에는 username이라는 타입이 없기 때문에
 * 우리가 직접 username을 추가한 타입을 만들어준 것
 *
 * -> 우리가 직접 타입을 정의해서 재 정의해준다
 */
