import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDom from "react-dom";
import 'react-toastify/dist/ReactToastify.css';
import App from "./components/App";
import { AuthProvider } from "./components/context/AuthContext";

ReactDom.render( <AuthProvider><App /></AuthProvider> , document.getElementById('root'));