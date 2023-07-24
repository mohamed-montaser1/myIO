import Head from "next/head";
import { Inter } from "next/font/google";
import { FormattedMessage } from "react-intl";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const register = () => {
    axios.post("/api/auth/register", {
      name: "Mohamed",
      email: "mohamed@gmail.com",
      password: "very secret password",
    });
  };
  return (
    <>
      <FormattedMessage id="input.email" defaultMessage={"اسم التطبيق"} />
      <button onClick={register}>Register Test</button>
    </>
  );
}
