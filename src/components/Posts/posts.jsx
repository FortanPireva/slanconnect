import { useEffect, useState } from "react";
import Post from "./post";
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
  const [posts, setPosts] = useState([]);

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
    setPosts(newposts);
  }, []);
  return (
    <div className="posts bg-gray-200 flex flex-col justify-center items-center">
      {posts.map((post) => (
        <Post key={post.id} post={post} onActionClick={handleButtonClick} />
      ))}
    </div>
  );
}
