import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles/RecentPost.module.css";

export default function RecentPost({ postAvatar, discription, id }) {
  const postImageLink = `uploads/postAvatar/${postAvatar}`;
  return (
    <div className={classes.singleRecentPost}>
      <div className={classes.recentPostImg}>
        <img
          src={`${window.location.origin}/${postImageLink}`}
          alt="recent_post"
        />
      </div>
      <div className={classes.recentPostDic}>
        <p>{discription.substring(0, 80)}...</p>
        <Link to={`/post/${id}`}>Read more</Link>
      </div>
    </div>
  );
}
