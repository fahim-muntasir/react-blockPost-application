import moment from "moment";
import { Link } from "react-router-dom";
import Button from "./Button";
import classes from "./styles/Card.module.css";

export default function Card({
  id,
  postAvatar,
  discription,
  author,
  category,
  date,
  postLike,
}) {
  const postImageLink = `./uploads/postAvatar/${postAvatar}`;
  return (
    <div className={classes.singleCard}>
      <div className={classes.cardImg}>
        <img src={postImageLink} alt="card_image" />
      </div>
      <div className={classes.cardInfo}>
        <div className={classes.publishInfo}>
          <span>Author {author} </span>
          <span>Published {moment(date).fromNow()}</span>
        </div>
        <div className={classes.cardDiscription}>
          <p> {discription.substring(0, 120)}... </p>
        </div>
        <Link to={`/post/${id}`}>
          <Button className={classes.readMoreBtn} text="Read more ->" />
        </Link>
      </div>
    </div>
  );
}
