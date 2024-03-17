import { User } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: User;
};

// 사이드바는 서버 컴포넌트로, props로 받아온 데이터를 보여주는 정적인 컴포넌트
export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}

        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>

      <p className="text-sm text-neutral-500 mt-8">
        About · Help · Press · API · Jobs · Privacy · Terms · Location ·
        Language
      </p>

      <p className="font-bold text-sm mt-8 text-neutral-500">
        @Copyright INSTANTGRAM from METAL
      </p>
    </>
  );
}
