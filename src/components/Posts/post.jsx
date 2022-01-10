import { useState } from "react";
import { BiLike } from "react-icons/bi";
import AppButton from "../AppButton/AppButton";
import ImagePreviewer from "../FileUploader/ImagePreviewer";
export default function Post(props) {
  const { post } = props;
  const { onActionClick } = props;
  const postDate = toDateTime(post.createdAt.seconds);
  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }
  return (
    <div className=" my-3 mx-2 max-w-lg mx-auto bg-white rounded-xl i">
      <div className="p-3 post-header flex-row flex justify-start pl-2 items-center">
        {post.user.photoURL ? (
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={post.user.photoURL}
            alt=""
          />
        ) : (
          <div class="m-1 mr-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
            {post.user.displayName
              ? post.user.displayName.charAt(0)
              : post.user.email.charAt(0)}
          </div>
        )}

        <div className="pl-2 flex flex-col">
          <p className="text-sm  p-0">
            {post.user.displayName ||
              post.user.email.substring(0, post.user.email.indexOf("@"))}
          </p>
          <span className="text-xs">
            {postDate.toDateString("en-US")} at{" "}
            {`${postDate.getHours()}:${
              postDate.getMinutes() > 10
                ? postDate.getMinutes()
                : "0" + postDate.getMinutes()
            }`}
          </span>
        </div>
      </div>
      <div className="content overflow-hidden">
        <div className="description p-2">{post.description}</div>
        {post.images && <ImagePreviewer imageSources={post.images} />}
        <div className="footer flex flex-row justify-between w-full">
          <AppButton
            onClick={() => onActionClick(post.id, "LIKE")}
            className="bg-white p-3 flex-1 hover:bg-gray-100 flex justify-around items-center"
          >
            {" "}
            <BiLike />
            <span className="ml-1">
              {post.likes} Like{post.likes > 1 ? "s" : ""}
            </span>
          </AppButton>
          <AppButton
            onClick={() => onActionClick(post.id, "COMMENT")}
            className="bg-white p-3  flex-1 hover:bg-gray-100 flex justify-around items-center"
          >
            {" "}
            <BiLike />{" "}
            <span className="ml-1">
              {post.comments} Comment{post.comments > 1 ? "s" : ""}
            </span>
          </AppButton>
          <AppButton
            onClick={() => onActionClick(post.id, "SHARE")}
            className="bg-white p-3 flex-1 hover:bg-gray-100 flex justify-around items-center"
          >
            {" "}
            <BiLike />{" "}
            <span className="ml-1">
              {post.shares} Share{post.shares > 1 ? "s" : ""}
            </span>
          </AppButton>
        </div>
      </div>
    </div>
  );
}
