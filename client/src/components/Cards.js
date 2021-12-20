import { useEffect, useState } from "react";
import Card from "./Card";
import { useAuth } from "./context/AuthContext";

export default function Cards() {
  const [allPost, setAllPost] = useState([]);

  const { getPost } = useAuth();
  useEffect(() => {
    getPost((response) => {
      if (!response.error) {
        setAllPost(response);
      }
    });
    return () => getPost;
  }, [getPost]);

  const cardItem = allPost.map((post, index) => (
    <Card
      key={Math.random() + index}
      id={post._id}
      author={post.author}
      discription={post.discription}
      postAvatar={post.postAvatar}
      category={post.category}
      date={post.postDate}
      postLike={post.postLike}
    />
  ));

  return <div className="cardContainer">{cardItem}</div>;
}
