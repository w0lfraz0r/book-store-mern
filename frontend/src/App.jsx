import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBooks from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBooks from "./pages/ShowBooks";

function App() {
  return (
    <Routes>
      <Route path='/' element={Home} />
      <Route path='/books/create' element={CreateBooks} />
      <Route path='/books/delete/:id' element={DeleteBook} />
      <Route path='/books/edit/:id' element={EditBook} />
      <Route path='/books/details/:id' element={ShowBooks} />
      {/* <div className="bg-red-400 text-white">App</div> */}
    </Routes>
  );
}

export default App;
