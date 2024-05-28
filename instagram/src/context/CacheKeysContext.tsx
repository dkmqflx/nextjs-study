import { createContext, useContext } from "react";

type CacheKeysValue = {
  postsKey: string;
};

// 기본 postsKey는 '/api/posts'
export const CacheKeysContext = createContext<CacheKeysValue>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
