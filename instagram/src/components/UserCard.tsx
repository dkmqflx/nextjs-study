import { ProfileUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: ProfileUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  // useRouter로 push 하지 않고 이렇게 Link 태그 사용하게 되면
  // Link 태그가 페이지 상에 보이게 될 때 미리 해당 페이지를 pre fetch 하게 된다
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50 "
    >
      <Avatar image={image} />

      <div className="text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
