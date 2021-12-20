import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "./Button";
import { useAuth } from "./context/AuthContext";
import Modal from "./Modal";
import classes from "./styles/Header.module.css";

export default function NavBar() {
  const { currentUser, logout, isLogin, checkLoading } = useAuth();
  const navigate = useNavigate();
  const logoutHandlear = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className={classes.headerTop}>
      <div className={classes.headerTitleDiv}>
        <Link to="/">
          <h1 className={classes.navTitle}>Blog Post</h1>
        </Link>
      </div>
      <div className={classes.controllBtn}>
        {checkLoading ? (
          isLogin ? (
            <>
              <span>
                <i className="far fa-user"></i> {currentUser}
              </span>
              <Button
                className={classes.logout}
                text="Logout"
                onClick={logoutHandlear}
              />
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className={classes.loginBtn} text="Login" />
              </Link>
              <Link to="/signup">
                <Button className={classes.signup} text="Signup" />
              </Link>
            </>
          )
        ) : null}
        <Modal />
        <ToastContainer />
      </div>
    </nav>
  );
}
