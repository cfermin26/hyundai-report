import * as React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
