import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavBar from "./NavBar";
import RecentPost from "./RecentPost";
import SinglePost from "./SinglePost";
import classes from "./styles/SinglePage.module.css";

export default function SinglePosts() {
  const navigation = useNavigate();
  const { id } = useParams();
  const { findPostById, getPost } = useAuth();
  const [loadin, setLoadin] = useState(false);
  const [singlePostData, setSinglePostData] = useState("");
  const [resentPost, setResentPost] = useState([]);

  useEffect(() => {
    getPost((response) => {
      if (!response.error) {
        setResentPost(response.reverse());
      }
    });
    return () => getPost;
  }, [getPost]);

  useEffect(() => {
    findPostById(id, (response) => {
      if (response.err) {
        alert("Not found!");
        navigation("/");
      } else {
        setSinglePostData(response);
        setLoadin(true);
      }
    });
    return () => findPostById;
  }, [findPostById, id, navigation]);

  const recentTop5Post = [];
  for (let i = 0; i < resentPost.length; i++) {
    if (i >= 5) {
      break;
    } else {
      recentTop5Post.push(
        <RecentPost
          key={Math.random() + i}
          postAvatar={resentPost[i].postAvatar}
          discription={resentPost[i].discription}
          id={resentPost[i]._id}
        />
      );
    }
  }

  return (
    <>
      <div className="container">
        <NavBar />
        <div className={classes.singlePostContainer}>
          <div className={classes.singlePostDetails}>
            {loadin ? (
              <SinglePost
                author={singlePostData.author}
                postDate={singlePostData.postDate}
                discription={singlePostData.discription}
                postAvatar={singlePostData.postAvatar}
              />
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
          <div className={classes.recentPostContainer}>
            <h4 className="mb-3">Recent Post</h4>
            {recentTop5Post}
          </div>
        </div>
      </div>
    </>
  );
}
