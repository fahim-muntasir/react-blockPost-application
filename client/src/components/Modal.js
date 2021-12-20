import { useState } from "react";
import { Modal } from 'react-bootstrap';
import Button from "./Button";
import PostForm from "./PostForm";
import classes from "./styles/Header.module.css";

export default function Example() {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
  
    return (
      <>
        <Button className={classes.postBtn} text="Post now +" onClick={() => handleShow('md-down')} />

        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Post Now</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <PostForm />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
