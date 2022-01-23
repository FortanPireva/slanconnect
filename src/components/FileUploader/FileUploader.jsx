import { useRef, useState } from "react";
export default function FileUploader({
  multiple = false,
  accept,
  onFileChange,
  FileIcon,
}) {
  const inputFile = useRef(null);

  return (
    <div className="flex justify-center items-center flex-row hover:cursor-pointer">
      <FileIcon
        size="2em"
        className="flex-1"
        onClick={() => inputFile.current.click()}
      />
      <input
        type="file"
        accept={accept}
        ref={inputFile}
        multiple={multiple}
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
