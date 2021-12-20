import { useEffect } from "react";
import Cards from "../Cards";
import { useAuth } from "../context/AuthContext";
import Layout from "../Layout";
import NavBar from "../NavBar";

export default function Home() {
  const { checkLogin } = useAuth();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <Layout>
      <NavBar />
      <Cards />
    </Layout>
  );
}
