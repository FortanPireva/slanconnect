import { useEffect, useState } from "react";
import useAuth from "../../contexts/useAuth";
import CreatePost from "./createPost";
import Post from "./post";
import postRepository from "../../services/Database/postRepository";
import { uploadImage } from "../../services/Storage/storage";
import ReactLoading from "react-loading";
const newposts = [
  {
    id: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque nihil reiciendis dolore minus possimus rerum dolor culpa excepturi enim.",
    createdAt: Date.now(),
    userInfo: {
      fullname: "Fortan",
      avatarUrl:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    likes: 10,
    comments: 10,
    shares: 10,
    postImage:
      "https://images.unsplash.com/photo-1485970247670-34cd80f5a996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque nihil reiciendis dolore minus possimus rerum dolor culpa excepturi enim.",
    createdAt: Date.now(),
    userInfo: {
      fullname: "Fortan",
      avatarUrl:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    likes: 10,
    comments: 10,
    shares: 10,
    postImage:
      "https://images.unsplash.com/photo-1457270508644-1e4905fabd7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque nihil reiciendis dolore minus possimus rerum dolor culpa excepturi enim.",
    createdAt: Date.now(),
    userInfo: {
      fullname: "Fortan",
      avatarUrl:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    likes: 10,
    comments: 10,
    shares: 10,
    postImage:
      "https://images.unsplash.com/photo-1457270508644-1e4905fabd7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur itaque nihil reiciendis dolore minus possimus rerum dolor culpa excepturi enim.",
    createdAt: Date.now(),
    userInfo: {
      fullname: "Fortan",
      avatarUrl: "https://avatar.google.com",
    },
    likes: 10,
    comments: 10,
    shares: 10,
    postImage:
      "https://images.unsplash.com/photo-1457270508644-1e4905fabd7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
];

export default function Posts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // create a post
  async function createPost(postDto) {
    try {
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
      let postRef = await postRepository.addPost(post);
      if (!postRef) {
        console.log("Couldn't get postRef");
      }
    } catch (err) {
      alert("Couldn't post ", err);
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
      <div className="posts bg-gray-200 flex flex-col justify-center items-center">
        {user && <CreatePost createPost={createPost} />}
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
