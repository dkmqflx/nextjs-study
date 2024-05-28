"use client";
import { AuthUser } from "@/model/user";
import { ChangeEvent, DragEvent, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  // 사용자가 드래그앤드롭이 아닌 클릭해서 이미지를 업로드할 수 도 있기 때문
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;

    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    // 파일을 드롭해서 가지고 있을 때 브라우저에서 자동으로 해당 파일을 브라우저에서 열려고 하는데 이를 막기 위한 것
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault(); // 브라우저의 기본 행동을 막고

    setDragging(false); // 상태를 변경시켜준 다음

    const files = e.dataTransfer?.files; // 파일이 있는지 확인

    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section>
      <PostUserAvatar username={username} image={image ?? ""} />

      <form>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
          <p>Drag and Drop your image here or click</p>
        </label>

        <textarea
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"Write a caption..."}
        />

        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
