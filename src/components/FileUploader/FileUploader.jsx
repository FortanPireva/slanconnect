import { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
export default function FileUploader({
  multiple = false,
  accept,
  onFileChange,
}) {
  const inputFile = useRef(null);

  return (
    <div className="flex justify-center items-center flex-row">
      <FcAddImage
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
