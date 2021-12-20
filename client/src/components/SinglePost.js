import moment from "moment";
import React from "react";
import classes from "./styles/SinglePage.module.css";

export default function SinglePost({
  author,
  postDate,
  discription,
  postAvatar,
}) {
  console.log();
  const postImageLink = `uploads/postAvatar/${postAvatar}`;
  return (
    <>
      <div className={classes.postBannerImg}>
        <img
          src={`${window.location.origin}/${postImageLink}`}
          alt="single_postImage"
        />
      </div>
      <div className={classes.postInfo}>
        <span>Author {author}</span>
        <span>Published {moment(postDate).format("L")}</span>
      </div>
      <div className={classes.singlePostDis}>
        <p>{discription}</p>
      </div>
    </>
  );
}
