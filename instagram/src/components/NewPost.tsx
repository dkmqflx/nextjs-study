"use client";
import { AuthUser } from "@/model/user";
import { ChangeEvent, DragEvent, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";
import Image from "next/image";

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
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <PostUserAvatar username={username} image={image ?? ""} />

      <form className="w-full flex flex-col mt-2">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}

          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}

          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>

        <textarea
          className="outline-none text-lg border border-neutral-300"
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
