import { BrowserRouter, Route, Routes } from "react-router-dom";
import Restaurants from "./components/restaurants/Restaurants";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Restau from "./pages/Restau";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<Restau />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
