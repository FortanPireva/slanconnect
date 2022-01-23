import { useEffect, useState } from "react";
import useAuth from "../../contexts/useAuth";
import CreatePost from "./createPost";
import Post from "./post";
import postRepository from "../../services/Database/postRepository";
import { uploadImage } from "../../services/Storage/storage";
import ReactLoading from "react-loading";
import { ToastContainer, toast as toastFunc } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Toast from "../Toast/Toast";
export default function Posts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createPostLoading, setPostLoading] = useState(false);
  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    type: "",
    lifetime: 2000,
  });
  // create a post
  async function createPost(postDto) {
    try {
      setPostLoading(true);
      let post = {
        description: postDto.description,
      };
      post.images = [];
      for (let i = 0; i < postDto.selectedFiles.length; i++) {
        const file = postDto.selectedFiles[i];
        let downloadUrl = await uploadImage(file);
        post.images.push(downloadUrl);
      }
      post.user = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      };
      let { ref: postRef, doc } = await postRepository.addPost(post);
      setPostLoading(false);
      if (!postRef) {
        console.log("Couldn't get postRef");
        return;
      }

      debugger;
      setPosts([doc, ...posts]);
      setToast({
        ...toast,
        showToast: true,
        type: "success",
        messsage: "Post created succesfully",
      });
      toastFunc.info("Post added successfully");
    } catch (err) {
      alert("Couldn't post ", err);
      setPostLoading(false);
      setToast({
        ...toast,
        showToast: true,
        type: "error",
        message: "Couldn't create post",
      });
      toastFunc.error("Couldnt't create post");
    }
  }
  const handleButtonClick = (id, type) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    switch (type) {
      case "LIKE":
        post.likes++;
        break;
      case "COMMENT":
        post.comments++;

        break;
      case "SHARE":
        post.shares++;
        break;
      default:
        return;
    }
    setPosts((prevPosts) => {
      return posts.map((p) => {
        if (p.id === id) return post;
        return p;
      });
    });
  };

  useEffect(() => {
    (async function doWorkAsync() {
      setLoading(true);
      const newposts = await postRepository.getPosts();
      if (newposts) {
        setPosts(newposts.map((post) => ({ id: post.id, ...post.data })));
      }
      setLoading(false);
    })();
  }, []);
  if (loading)
    return (
      <div className="container mx-auto   flex flex-col justify-center items-center max-h-full">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  return (
    <>
      <div className="posts bg-gray-200 flex flex-col justify-center items-center dark:bg-gray-800">
        {user && <CreatePost createPost={createPost} />}
        {createPostLoading && <ReactLoading type="spin" color="#000" />}
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post} onActionClick={handleButtonClick} />
          ))
        ) : (
          <h1>No posts to show</h1>
        )}
      </div>
    </>
  );
}
