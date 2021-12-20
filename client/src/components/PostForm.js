import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./context/AuthContext";

export default function PostForm() {
  const { createPost, isLogin, currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [postAvatar, setPostAvatar] = useState("");
  const [category, setCategory] = useState("");

  const notify = (msg) => toast(msg);

  const postSubmitHandlear = (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("author", currentUser);
    postData.append("title", title);
    postData.append("discription", discription);
    postData.append("postAvatar", postAvatar);
    postData.append("category", category);

    createPost(postData, (response) => {
      if (response.error) {
        notify(response.error.msg);
      } else {
        setTitle("");
        setDiscription("");
        setPostAvatar("");
        setCategory("");
        notify(response.msg);
      }
    });
  };

  return (
    <Form onSubmit={postSubmitHandlear} encType="multipart/form-data">
      {isLogin ? (
        <>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Post Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPostAvatar(e.target.files[0])}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Post category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Button type="submit" className="mt-3" variant="primary">
            Post
          </Button>
        </>
      ) : (
        <>
          <h2>Please Login</h2>
          <Link to="/login">
            <Button type="button" className="mt-3" variant="primary">
              Login Now
            </Button>
          </Link>
        </>
      )}
    </Form>
  );
}
