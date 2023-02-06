import "./styles/globals.css";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Agir from "./pages/Agir";
import Consulter from "./components/Consulter";
import Evaluer from "./components/Evaluer";
import Douleurs from "./components/Douleurs";
import Tutos from "./components/Tutos";
import Douleur from "./components/Douleur";
import Ressources from "./pages/Ressources";
import Annuaire from "./components/Annuaire";
import Shop from "./pages/Shop";
import Agenda from "./pages/Agenda";
import About from "./pages/About";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="agir" element={<Agir />} />
      <Route path="consulter" element={<Consulter />} />
      <Route path="evaluer" element={<Evaluer />} />
      <Route path="douleurs" element={<Douleurs />} />
      <Route path="douleur" element={<Douleur />} />
      <Route path="tutos" element={<Tutos />} />
      <Route path="ressources" element={<Ressources />} />
      <Route path="annuaire" element={<Annuaire />} />
      <Route path="shop" element={<Shop />} />
      <Route path="agenda" element={<Agenda />} />
      <Route path="a-propos" element={<About />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
