type Props = {
  image?: string | null;
  size?: "small" | "normal";
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = "normal",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className={`bg-white rounded-full ${getImageSizeStyle(size)}`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: string): string {
  return size === "small"
    ? "w-[34px] h-[34px] p-[0.1rem]"
    : "w-16 h-16 p-[0.2rem] ";
}

/**
 * next의 Image 를 사용할 때 외부 이미지 주소를 사용하기 위해서는 next.config.js에서 필요한 경로를 추가해주면 되었다
 * 하지만 여기서는 구글에서 자체적으로 가지고 있는 이미지 주소를 보내주고 있는데,
 * 이것이 도메인을 가지는지 알 수 없기 때문에 특정한 url을 지정할 수 없다
 * 그렇기 때문에 일반 img 태그를 사용하는 것
 * 
 * 
 * 외부에서 url 받아와서 이미지 그릴 때 x 박스 나타나는 경우 있는데 
 * referrerPolicy="no-referrer" 사용하면 이러한 문제 해결할 수 있다

 */
