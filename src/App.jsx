import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import "./app.css";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <div className="App  mx-auto">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Nuestro catálogo" />}
          />
          <Route
            path="/category/:categoryId"
            element={<ItemListContainer greeting="Categorías" />}
          />
          <Route
            path="/plant/:itemId"
            element={<ItemDetailContainer greeting="Detalle del producto" />}
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
