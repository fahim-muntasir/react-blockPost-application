import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  const createUser = (data, cd) => {
    fetch("http://localhost:5000/user", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => cd(data))
      .catch((err) => cd(err));
  };

  const login = (email, password) => {
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error.msg);
        } else {
          setCurrentUser(data.name);
          setLogin(true);
        }
        setLoading(true);
      });
  };

  const checkLogin = () => {
    const tokenId = localStorage.getItem(process.env.REACT_APP_LOCALSTORE_NAME);
    fetch("http://localhost:5000/user/logauth", {
      method: "POST",
      body: tokenId ? tokenId : null,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login) {
          setCurrentUser(data.userData.name);
          setLogin(true);
        } else {
          setLogin(false);
        }
        setCheckLoading(true);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    const tokenId = localStorage.getItem(process.env.REACT_APP_LOCALSTORE_NAME);
    if (tokenId) {
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORE_NAME);
      setLogin(false);
    } else {
      fetch("http://localhost:5000/user/logout", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setLogin(false);
          }
          setLoading(true);
        });
    }
  };

  const createPost = (postData, cd) => {
    fetch("http://localhost:5000/post/", {
      method: "POST",
      body: postData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cd(data))
      .catch((err) => cd(err));
  };

  const getPost = (cd) => {
    fetch("http://localhost:5000/post")
      .then((response) => response.json())
      .then((data) => {
        cd(data);
      })
      .catch((err) => cd(err));
  };

  const findPostById = (id, cd) => {
    fetch(`http://localhost:5000/post/singlepost/${id}`)
      .then((response) => response.json())
      .then((data) => cd(data))
      .catch((err) => cd({ err: "Not found" }));
  };

  const value = {
    currentUser,
    isLogin,
    createUser,
    checkLogin,
    createPost,
    findPostById,
    checkLoading,
    getPost,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? children : null}
    </AuthContext.Provider>
  );
}
