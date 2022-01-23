import { useState, useEffect } from "react";
import AppButton from "../AppButton/AppButton";
import { FileUploader } from "../FileUploader";
import ImagePreviewer from "../FileUploader/ImagePreviewer";

export default function CreatePost(props) {
  const [selectedFiles, setselectedFiles] = useState([]);
  const [imageSources, setImageSources] = useState([]);
  const [description, setDescription] = useState("");
  function onFileChange(event) {
    debugger;
    const files = event.target.files;
    setselectedFiles(files);
  }
  function handleCreatePost(event) {
    event.preventDefault();
    props.createPost({
      description,
      selectedFiles,
    });
    setTimeout(() => {
      setDescription("");
      setselectedFiles([]);
      setImageSources([]);
    }, 2000);
  }
  useEffect(() => {
    if (!selectedFiles.count == 0) {
      setImageSources([]);
      return;
    }

    const objectUrls = Array.from(selectedFiles).map((selectedFile) =>
      URL.createObjectURL(selectedFile)
    );
    setImageSources(objectUrls);

    // free memory when ever this component is unmounted
    return () => imageSources.forEach((source) => URL.revokeObjectURL(source));
  }, [selectedFiles]);
  return (
    <div className="mt-4 max-w-lg w-full mx-auto  bg-gray-100 dark:bg-gray-900 dark:bg-dark">
      <form action="" onSubmit={handleCreatePost}>
        <textarea
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          class="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white
          dark:bg-zinc-900
            dark:text-white          
          bg-clip-padding
          border border-solid border-gray-300
          dark:border-gray-600
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          rows="5"
          placeholder="Write something"
          value={description}
        ></textarea>
        {imageSources.length > 0 && (
          <ImagePreviewer imageSources={imageSources} />
        )}
        <div className="flex flex-row justify-between px-3">
          <FileUploader multiple={true} onFileChange={onFileChange} />
          <AppButton defaultStyle={true}>Create Post</AppButton>
        </div>
      </form>
    </div>
  );
}
