import reactDom from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // SSR에서는 처리하지 않는다
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal") as Element;
  return reactDom.createPortal(children, node);
}
