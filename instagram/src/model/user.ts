// 세션 상에서 얻을 수 있는 유저 정보

// 이름이 모호한 부분이 있어서 리팩토링해주었다.

// 아래는 로그인한 유저
export type AuthUser = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
