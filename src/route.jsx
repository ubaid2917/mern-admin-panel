import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import List from "./pages/User/List";
import AddUser from "./pages/User/Add";
import EditUser from "./pages/User/Edit";
import ProductList from "./pages/Product/List";
import Catgory from "./pages/Category/List";


const RoutesComp = () => {
  return (
    <>
      <Routes>
        
        <Route path="users">
          <Route path="list" element={<List />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>

        <Route path="/product" element={<ProductList />} />
        <Route path="/category" element={<Catgory />} />
      </Routes>
     
    </>
  );
};

export default RoutesComp;
