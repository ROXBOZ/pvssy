import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// css
import "./styles/globals.css";

// pages and components
import Layout from "./layout/Layout";
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

//contexts
import { PainsContext } from "./contexts/PainsContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    // <PainsContext>
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
    // </PainsContext>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <PainsContext>
//         <Routes>
//           <Route index element={<Home />} />
//           <Route path="agir" element={<Agir />} />
//           <Route path="consulter" element={<Consulter />} />
//           <Route path="evaluer" element={<Evaluer />} />
//           <Route path="douleurs" element={<Douleurs />} />
//           <Route path="douleur" element={<Douleur />} />
//           <Route path="tutos" element={<Tutos />} />
//           <Route path="ressources" element={<Ressources />} />
//           <Route path="annuaire" element={<Annuaire />} />
//           <Route path="shop" element={<Shop />} />
//           <Route path="agenda" element={<Agenda />} />
//           <Route path="a-propos" element={<About />} />
//         </Routes>
//       </PainsContext>
//       <Footer />
//     </div>
//   );
// }

export default App;
