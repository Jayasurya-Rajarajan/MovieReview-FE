import React from "react";
import Header from "../Header/Header";
import './Layout.css';
import Content from "../Content/Content";

const Layout = () => {
  return (
    <>
      <section className="layout__header">
        <Header />
      </section>
      <section className="layout__content">
        <Content />
      </section>
    </>
  );
};

export default Layout;
