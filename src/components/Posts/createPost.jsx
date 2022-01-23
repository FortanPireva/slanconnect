import { useState, useEffect } from "react";
import AppButton from "../AppButton/AppButton";
import { FileUploader, ImagePreviewer, VideoPreviewer } from "../FileUploader";
import { FcAddImage, FcVideoFile } from "react-icons/fc";

export default function CreatePost(props) {
  const [selectedFiles, setselectedFiles] = useState([]);
  const [imageSources, setImageSources] = useState([]);
  const [videoSources, setVideoSources] = useState([]);
  const [description, setDescription] = useState("");
  function onFileChange(event) {
    const files = event.target.files;

    setselectedFiles([...selectedFiles, files]);
  }

  function onVideoFileChange(event) {
    const files = event.target.files;
    debugger;

    setselectedFiles([...selectedFiles, files]);
  }
  async function handleCreatePost(event) {
    event.preventDefault();
    await props.createPost({
      description,
      selectedFiles,
    });
    setDescription("");
    setselectedFiles([]);
    setImageSources([]);
  }
  function fileListToArray(fileList) {
    let arr = [];
    for (let i = 0; i < fileList.length; i++) {
      arr.push(fileList[i][0]);
    }
    return arr;
  }
  useEffect(() => {
    if (!selectedFiles.count == 0) {
      setImageSources([]);
      return;
    }
    debugger;
    let selectedFilesAsArray = fileListToArray(selectedFiles);
    const imageObjectUrls = selectedFilesAsArray
      .filter((file) => file.type.includes("image"))
      .map((selectedFile) => URL.createObjectURL(selectedFile));
    setImageSources(imageObjectUrls);

    const videoObjectUrls = selectedFilesAsArray
      .filter((file) => !file.type.includes("image"))
      .map((selectedFile) => ({
        src: URL.createObjectURL(selectedFile),
        type: selectedFile.type,
      }));
    setVideoSources(videoObjectUrls);

    // free memory when ever this component is unmounted
    return () => {
      imageSources.forEach((source) => URL.revokeObjectURL(source));
      videoObjectUrls.forEach((videoSource) =>
        URL.revokeObjectURL(videoSource.src)
      );
    };
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
        {videoSources.length > 0 && (
          <VideoPreviewer videoSources={videoSources} />
        )}
        <div className="flex flex-row justify-between px-3">
          <div className="flex flex-row">
            <FileUploader
              multiple={true}
              onFileChange={onFileChange}
              accept="image/png, image/gif, image/jpeg"
              FileIcon={FcAddImage}
            />
            <FileUploader
              multiple={true}
              onFileChange={onVideoFileChange}
              accept="video/mp4,video/x-m4v,video/*"
              FileIcon={FcVideoFile}
            />
          </div>

          <AppButton defaultStyle={true}>Create Post</AppButton>
        </div>
      </form>
    </div>
  );
}
