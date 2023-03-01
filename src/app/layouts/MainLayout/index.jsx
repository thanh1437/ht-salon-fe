import { React } from "react";
import Header from "./Header/index";
import Footer from "./Footer/index";

export default function DefaultLayout({ children, t }) {
  return (
    <div className="App">
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
