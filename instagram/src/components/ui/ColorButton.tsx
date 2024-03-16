type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className="rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]">
      <button
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

/**
 * ColorButton은 상태를 사용하진 않지만
 * 브라우저 이벤트(onClick)를 사용하기 때문에 클라이언트 컴포넌트여야 하지 않나요?
 * 저는 ColorButton을 사용하는 상위 컴포넌트에서 'use client'처리를 해두었기 때문에
 * ColorButton에는 별도로 명시하지 않았다고 이해했습니다.
 *  상위 컴포넌트에서 'use client'를 쓰면
 * 그 하위 컴포넌트는 자동적으로 클라이언트 컴포넌트가 되니까요.
 *
 * -> 어차피 onClick을 전달하는 컴포넌트는 무조건 클라이언트가 될 것이기 때문에,
 * 굳이 한번 더 선언하지 않은 것 같다
 */
