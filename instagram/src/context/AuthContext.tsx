"use client";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

/**
 * Context로 감싼 컴포넌트 내부에
 * 서버 컴포넌트 그리고 클라이언트 컴포넌트가 있다면,
 * 클라이언트에서만 컨텍스트의 상태에 접근할 수 있다.
 * 그 이유는 서버 컴포넌트에서는 상태를 가질 수 없기 때문
 *
 * 서버 컴포넌트가 클라이언트 컴포넌트 안에서 사용될 수 있는 방법은 children props를 사용하는 것으로
 * 위 코드도 클라이언트 컴포넌트에서 children props를 사용하고 있기 때문에 서버 컴포넌트를 전달받을 수 있는 것이다
 *
 * https://stackoverflow.com/questions/77015023/if-i-pass-a-server-component-to-a-client-component-via-the-children-prop-will-i
 * https://medium.com/@issam.ahw/demystifying-next-js-server-components-and-client-components-1b15ae405260
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers
 * https://vercel.com/guides/react-context-state-management-nextjs#rendering-third-party-context-providers-in-server-components
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#interleaving-server-and-client-components
 * https://www.youtube.com/watch?v=c8Q_Kp_lDng
 *
 * 요약하자면, use clinet로 선언된 context와 같은 컴포넌트를 전역적으로 감싼다고해서
 * 내부에 있는 서버  컴포넌트 또한 클라이언트 컴포넌트가 되지 않는데
 * 그 이유는 children으로 prosp를 전달받기 때문이다
 * 즉, 클라이언트 컴포넌트 내부에 import해서 서버 컴포넌트를 가져오면 그 컴포넌트는 클라이언트 컴포넌트가 되지만
 * children을 통해서 외부에서 전달받으면 그대로 서버컴포넌트가 된다
 */
