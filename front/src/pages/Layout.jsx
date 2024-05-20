import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/layout/Nav";
// outlet permet de render la page sélectionnée
// link permet de naviguer entre les pages

const Layout = () => {
  return (
    <div className="flex flex-col h-[100%] w-[100%]">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
