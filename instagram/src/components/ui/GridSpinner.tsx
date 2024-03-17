import dynamic from "next/dynamic";

// 콘솔창 보면 에러 메세지가 있는데,
// client 에서 쓰는 spinner 을 next 가 ssr로 미리 불러와서 생기는 문제

// 라이브러리를 dynamic import 한다
// 서버에서 미리 렌더링 하지 않는다
// 네트워크 탭을 보면 이전과 달리
// Grid 와 관련된 로딩 스피너가 document에 없는 것을 확인할 수 있다.
const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = "red" }: Props) {
  return <GridLoader color={color} />;
}
