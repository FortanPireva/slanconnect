import { useState } from "react";
import { BiLike } from "react-icons/bi";
import AppButton from "../AppButton/AppButton";
export default function Post(props) {
  const { post } = props;
  const { onActionClick } = props;
  const postDate = new Date(post.createdAt);

  return (
    <div className=" my-3 mx-2 max-w-md mx-auto bg-white rounded-xl i">
      <div className="p-3 post-header flex-row flex justify-start pl-2 items-center">
        <img
          class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src={post.userInfo.avatarUrl}
          alt=""
        />
        <div className="pl-2 flex flex-col">
          <p className="text-sm  p-0">{post.userInfo.fullname}</p>
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
        {post.postImage && <img src={post.postImage} />}
        <div className="footer flex flex-row justify-between w-full">
          <AppButton
            onClick={() => onActionClick(post.id, "LIKE")}
            classes="bg-white p-3 flex-1 hover:bg-gray-100 flex justify-around items-center"
          >
            {" "}
            <BiLike />
            <span className="ml-1">
              {post.likes} Like{post.likes > 1 ? "s" : ""}
            </span>
          </AppButton>
          <AppButton
            onClick={() => onActionClick(post.id, "COMMENT")}
            classes="bg-white p-3  flex-1 hover:bg-gray-100 flex justify-around items-center"
          >
            {" "}
            <BiLike />{" "}
            <span className="ml-1">
              {post.comments} Comment{post.comments > 1 ? "s" : ""}
            </span>
          </AppButton>
          <AppButton
            onClick={() => onActionClick(post.id, "SHARE")}
            classes="bg-white p-3 flex-1 hover:bg-gray-100 flex justify-around items-center"
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
